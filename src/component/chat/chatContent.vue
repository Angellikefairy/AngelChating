<template>
    <div id="chatContent" ref="chatContent" @scroll="onScroll">
        <div v-for="(message) of messageContent" :key="message.messageId" class="message">
            <div v-if="message.position === 'left'">
                <chat-message :message="message" :messageSide="message.leftSide" side="left" :dialogVisible.sync="dialogVisible" :targetMes.sync="targetMes"></chat-message>
            </div>      
            <div v-else>
                <chat-message :message="message" :messageSide="message.rightSide" side="right"></chat-message>
            </div>      
        </div>
        <add-friend-dialog :visible.sync="dialogVisible" :targetMes="targetMes"></add-friend-dialog>
    </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from "vue-property-decorator";
import * as _ from "lodash";
import addFriendDialog from "../Friends/addFriendDialog.vue";
import {AddFriendDialogTarget} from "@/types/friends/index";
import {resolveEmoji} from "@/util/util";
import chatMessage  from "./chatMessage.vue";


@Component({
    components: {
        addFriendDialog,
        chatMessage
    }
})
export default class ChatContent extends Vue {
    distance: number = 0;
    disabled: boolean = false;
    limit: number = 20;
    init: Map<string,boolean> = new Map();
    pageMap: Map<string,number> = new Map();
    curPage: number = 1; // 为了方便设置一个curPage用来存放每次切换后的dialog的page大小
    dialogVisible: boolean = false;
    targetMes: AddFriendDialogTarget = {
        avatar: '',
        name: '',
        dialogType: 0
    };

    created() {
        this.$store.watch(state => {
            return state.focusTargetId
        },(targetId,oldTargetId) => {
            const pageMap = this.pageMap;
            if(pageMap.has(oldTargetId)) {
                pageMap.set(oldTargetId,this.curPage);
            }
            if(!pageMap.has(targetId)) {
                pageMap.set(targetId,1);
            }
            this.curPage = (pageMap.get(targetId) as number);            
        })

        this.$store.watch(state => state.sidebarChosen , () => {
            this.$nextTick(()=>{
                const element: Element = this.$el;
                element.scrollTop = element.scrollHeight - element.clientHeight;
            })
        })
    }

    get focusTargetId() {
        const {focusTargetId} = this.$store.state;
        this.init.set(focusTargetId,true);
        return focusTargetId;
    }

    get loginState() {
        return this.$store.state.loginState;
    }

    get userBasicMes() {
        const userBasicMes = this.$store.state.userBasicMes;
        if(userBasicMes) {
            return userBasicMes;
        }
        else return {};
    }
    /**
     * 消息列表内容的计算属性
     */
    get messageContent() {
        this.initThisTargetMessageList();
        const messageMes = this.$store.state.messageMap[this.focusTargetId];
        if(messageMes) {
            if(this.init.get(this.focusTargetId) || this.$store.state.scrollDown) {
                this.$nextTick(()=>{
                    const element: Element = this.$el;
                    element.scrollTop = element.scrollHeight - element.clientHeight;
                    this.init.set(this.focusTargetId,false);
                })
            }
            const messages = messageMes.messageContent;
            for(let message of messages) {
                resolveEmoji(message,'messageContent');
            }
            return messageMes.messageContent.slice().reverse();
        }
        else return [];
    }

    onScroll = _.throttle(this.getNewHistoryMessage,400);

    /**
     * 获取新的历史聊天记录
     */
    getNewHistoryMessage(e) {
        const element: Element = e.target;
        const {dialogId,dialogTargetType,dialogTargetId} = this.getDialogMes();
        this.$store.commit('changeScrollDown',false);
        if(Math.floor(element.scrollTop)+1 < element.scrollHeight - element.clientHeight) {
            this.$store.commit('resetNewMesNum',dialogTargetId);
        }
        let isScroll = element.scrollHeight > element.clientHeight ? true : false
        if(!this.disabled && element.scrollTop === this.distance && isScroll) {
            this.$store.dispatch('resolveMessageMap',{
                dialogId,
                dialogTargetId,
                page: this.curPage,
                limit: this.limit,
                app: this
            }) 
            this.$nextTick(()=>{
                element.scrollTop = 5;
            })
            this.curPage++;
        }
    }
    

    getTargetMes(message) {
        const mesTarget = message.messageTargetMes;
        return {
            avatar: mesTarget.targetAvatar,
            id: mesTarget.targetId,
            name: mesTarget.targetName,
            state: mesTarget.targetState
        }
    }
    /**
     * 初始化当前focusTarget的消息列表
     */
    async initThisTargetMessageList() {
        if(this.loginState&&this.focusTargetId) {
            const {messageMap} = this.$store.state;
            const {dialogId,dialogTargetType,dialogTargetId} = this.getDialogMes();
            if(!messageMap[dialogTargetId] && dialogId) {
                this.$store.dispatch('resolveMessageMap',{
                    dialogId,
                    dialogTargetId,
                    page: this.curPage,
                    limit: this.limit
                })            
                this.curPage++;
            }
        }
        else {
            if(this.focusTargetId) {
                const dialogTargetId = this.focusTargetId;
                const {messageMap} = this.$store.state;
                if(!messageMap[dialogTargetId]) {
                    this.$store.dispatch('resolveMessageMap',{
                        undefined,
                        dialogTargetId,
                        page: this.curPage,
                        limit: this.limit
                    })        
                    this.curPage++;    
                }
            }
        }
    }
    /**
     * 获取dialog信息
     */
    getDialogMes() {
        const {dialogList,focusTargetId} = this.$store.state;
        for(let dialog of dialogList) {
            if(dialog.dialogTargetId === this.focusTargetId) {
                return dialog;
            }
        }
    }
}
</script>

<style scoped>
#chatContent {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 8px 10px 0 10px;
}
#chatContent::-webkit-scrollbar {
    display: block;
    width: 6px;
}
::-webkit-scrollbar {
    display: none;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(144,147,153,.3);
    border-radius: 4px;
}
::-webkit-scrollbar-track {
    background-color: rgba(241, 241, 241, 0.6);
}
.message {
    box-sizing: border-box;
    margin-bottom: 10px;
    position: relative;
}
</style>