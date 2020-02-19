<template>
  <div :id="dialogMes.dialogTargetId" :class="{dialogFocus: focusState,'dialog-item': true}" @click="onFocus">
    <el-avatar id="item-avatar" fit="contain" :size="48" :src="dialogMes.avatar" @error="errorHandler">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
    </el-avatar>
    <div id="dialog-mes">
        <div id="dialog-nameAndTime">
            <p id="dialog-name">{{dialogMes.dialogTargetName}}</p>
            <p id="dialog-time">{{dialogTime}}</p>
        </div>
        <div id="dialog-content">
            <p>
                {{lastMessageFromName}}{{lastMessageContent}}
                <el-badge class="mark" :value="dialogMes.newMesNum" :max="99" v-show="dialogMes.newMesNum" />
            </p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import {Vue,Component,Prop,Watch,Ref} from "vue-property-decorator"
import {resolveTime,resolveEmoji} from "@/util/util"
@Component
export default class dialogItem extends Vue {
    @Prop() dialogMes: any; 
    @Prop() index!: number;

    onFocus() {
        this.$store.commit('updateFocusState',this.dialogMes.dialogTargetId);
    }

    get focusState() {
        const {focusTargetId,loginState} = this.$store.state;
        if(this.dialogMes.dialogTargetId === focusTargetId) {
            if(loginState) {
                this.$store.commit('resetNewMesNum',focusTargetId);
            }
            return true;
        }
        else return false;
    }

    created() {
        // 将对话框移到可视范围内
        this.$store.watch(state=>state.focusTargetId,(focusTargetId)=>{
            const focusTarget = document.getElementById(focusTargetId);
            if(!focusTargetId) return;
            (focusTarget as HTMLElement).scrollIntoView(false);
        })
    }

    errorHandler(e) {
        //console.log(e);
    }

    get dialogTime(): string {
        return resolveTime(this.dialogMes.lastMessage.message_created_time,'');     
    }

    get lastMessageFromName(): string {
        if(this.dialogMes.dialogTargetType === "group") {
            return this.dialogMes.lastMessage.message_from_name + ': ';
        }
        else return '';
    }

    get lastMessageContent(): string {
        const message = this.dialogMes.lastMessage;
        if(message.message_content_type === 'text') {
            resolveEmoji(message,'message_content');
            return message.message_content;
        }
        else if (/image\/(gif|jpeg|jpg|png|svg)/g.test(message.message_content_type)) {
            return `[图片]`;
        }
        else return '';
    }
}
</script>

<style>
#dialog-content .mark {
    position: absolute;
    right: 0px;
}
#dialog-mes p {
    margin: 0px;
    cursor: default;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
    overflow: hidden;
}
#dialog-content p {
    width: 188px;
}
div {
    box-sizing: border-box;
}
#dialog-content {
    font-size: 12px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    position: relative;
}
#dialog-content p {
    color: rgba(247, 247, 247, 0.7);
}
#dialog-nameAndTime {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


#dialog-name{
    font-size: 14px;
    color: rgba(247, 247, 247, 1);
}
#dialog-time {
    font-size: 12px;
    color: rgba(247, 247, 247, 0.7);
}
.dialog-item:hover {
    background-color: rgba(171, 184, 195, 0.4);
}
#dialog-mes {
    flex: 1;
    margin-left: 12px;
    height: 46px;
    padding-top: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.dialog-item {
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 16px;
    transition: background-color 0.2s;
    box-sizing: border-box;
}

.dialogFocus {
    background-color: rgba(171, 184, 195, 0.4);
}
.el-badge__content {
    height: 16px;
    padding: 0 5px;
    font-size: 10px;
}
</style>