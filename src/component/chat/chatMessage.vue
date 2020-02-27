<template>
  <div :class="[isLeftSide ? 'leftMessageDirection': 'rightMessageDirection','flex']">
    <el-avatar class="message-avatar" fit="contain" :size="44" :src="messageSide.avatar" @click.native="addFriend">
        <img src="//cdn.suisuijiang.com/fiora/avatar/11.jpg?imageView2/3/w/88/h/88"/>
    </el-avatar>
    <div :class="[isLeftSide ? 'messageMes' : 'right-messageMes']">
        <div :class="['mes-header', isLeftSide?'':'reverse']">
            <span :class="['header-name',isLeftSide ? '' : 'right-name']">{{messageSide.name}}</span>
            <span class="header-time">{{message.messageCreatedTime}}</span>
        </div>
        <div class="flex">
            <div :class="[isLeftSide ? '' : 'mes-backgroundRight','mes-background']">
                <div class="mes-content" v-if="message.messageContentType === 'text'">
                    {{message.messageContent}}
                </div>
                <div class="mes-content" v-else-if="/image\/(gif|jpeg|jpg|png|svg)/g.test(message.messageContentType)">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="message.messageContent" 
                        :preview-src-list="[message.messageContent]">
                        <div slot="placeholder" class="image-slot">
                            加载中<i class="el-icon-loading"></i>
                        </div>
                    </el-image>
                </div>
                <div class="mes-content" v-else>
                    <i class="el-icon-loading"></i>
                </div>
            </div>
            <div :class="[isLeftSide ? '':'arrowRight','arrow']"></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Vue,Component,Prop} from "vue-property-decorator";
import {AddFriendDialogTarget} from "@/types/friends/index";

@Component
export default class ChatMessage extends Vue {
    @Prop() message!: any;
    @Prop() messageSide!: any;
    @Prop() side!: string;
    @Prop() dialogVisible!: boolean;
    @Prop() targetMes!: any;

    get isLeftSide() {
        return this.side === 'left';
    }

    addFriend() {
        if(this.side === 'right') return;
        const message = this.message;
        const {leftSide: {avatar,name},messageType} = message;
        let targetMes = Object.assign(this.targetMes);
        let dialogVisible = this.dialogVisible;
        targetMes = {
            avatar,
            name,
            dialogType: messageType
        }
        this.$emit('update:dialogVisible',!dialogVisible);
        this.$emit('update:targetMes',targetMes);
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}
.leftMessageDirection {
    flex-direction: row;
}
.rightMessageDirection {
    flex-direction: row-reverse;
}
.message-avatar{
    cursor: pointer;
}
.messageMes {
    margin-left: 12px;
    color: black;
}
.mes-header {
    height: 20px;
    display: flex;
    align-items: flex-end;
}
.header-name {
    color: #333;
    font-size: 13px;
    user-select: text;
    margin-right: 4px;
}
.header-time {
    color: #666;
    font-size: 12px;
}
.mes-content {
    word-break: break-word;
    max-width: 450px;
}
.mes-background {
    display: inline-block;
    color: #555;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 6px 8px;
    box-sizing: border-box;
    border-radius: 8px;
    border-top-left-radius: 0px;
    min-height: 28px;
    margin-top: 3px;
}
.mes-backgroundRight {
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(171, 184, 195, 1);
    border-top-left-radius: 8px;
    border-top-right-radius: 0px;
}
.arrow {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 7px 15px 0;
    border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
    position: absolute;
    top: 23px;
    left: 50px;
}
.arrowRight {
    border-width: 0 0 15px 7px;
    border-color: transparent transparent transparent rgba(171, 184, 195, 1);
    left: initial;
    right: 49px;
    top: 23px;
}
.right-messageMes {
    margin-left: 0;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.reverse {
    flex-direction: row-reverse;
}
.right-name {
    margin-right: 0;
    margin-left: 4px;
}

</style>