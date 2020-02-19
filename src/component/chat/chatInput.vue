<template>
  <div id="chatInput">
    <div v-if="loginState" id="inputBox" class="flex">
        <div id="chat-image" class="icon flex center">
            <image-upload></image-upload>
        </div>
        <div id="chat-gif" class="icon flex center">
            <svg viewBox="0 0 24 24"><g><path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path><path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"></path></g></svg>
        </div>
        <div id="chat-input">
            <el-input
                placeholder="请输入内容"
                v-model="inputMessage"
                @keyup.enter.native="sendInputMessage"
                >
                <emoji 
                slot="suffix" 
                id="emoji" 
                :input.sync="inputMessage">
                </emoji>
            </el-input>
        </div>
        <div id="sendMesIcon" class="icon flex center">
            <svg viewBox="0 0 24 24" @click="sendInputMessage"><g><path d="M21.13 11.358L3.614 2.108c-.29-.152-.64-.102-.873.126-.23.226-.293.577-.15.868l4.362 8.92-4.362 8.92c-.143.292-.08.643.15.868.145.14.333.212.523.212.12 0 .24-.028.35-.087l17.517-9.25c.245-.13.4-.386.4-.664s-.155-.532-.4-.662zM4.948 4.51l12.804 6.762H8.255l-3.307-6.76zm3.307 8.26h9.498L4.948 19.535l3.307-6.763z"></path></g></svg>
        </div>
    </div>
    <div v-else id="guestInfo" class="flex center">
        <p>游客朋友你好，请
            <router-link to="/login" id="loginLink">登录</router-link>
            后参与聊天
        </p>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {sendMessage} from "@/service/message.service"
import emoji from "./emoji.vue";
import imageUpload from "./imageUpload.vue";


@Component({
    components: {
        emoji,
        imageUpload
    }
})
export default class ChatInput extends Vue {
    inputMessage: string = '';
    showEmoji: boolean = false;
    get loginState(): boolean {
        return this.$store.state.loginState;
    }

    /**
     * 发送消息
     */
    sendInputMessage() {
        sendMessage(this.inputMessage,'text',this);
    }

    selectEmoji() {
        this.showEmoji = !this.showEmoji;
    }
}
</script>

<style>
svg {
    height: 1.5em;
    flex-shrink: 0;
    color: rgba(29,161,242,1.00);
    fill: currentcolor;
    user-select: none;
    vertical-align: text-bottom;
    position: relative;
    cursor: pointer;
}
#chat-input {
    flex: 1;
}
#chat-input .el-input__inner {
    background-color: rgb(230, 236, 240);
    border-radius: 16px;
    height: 32px;
}
#chat-input .el-input__suffix {
    display: flex;
    align-items: center;
}
#inputBox {
    height: 100%;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 5px;
}
.icon {
    min-width: 39px;
    min-height: 39px;
}

#loginLink {
    color: rgba(171, 184, 195, 1);
    font-size: 16px;
    font-weight: bolder;
    text-decoration: none;
}
#chatInput {
    height: 70px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
}
#guestInfo {
    height: 100%;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: default;
}

.flex {
    display: flex;
    flex-direction: row;
}

.center {
    justify-content: center;
    align-items: center;
}

</style>