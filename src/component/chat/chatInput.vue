<template>
  <div id="chatInput">
    <div v-if="loginState" id="inputBox" class="flex">
        <div id="chat-image" class="icon flex center">
            <image-upload></image-upload>
        </div>
        <div id="chat-gif" class="icon flex center">
            <clip></clip>
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
import clip from "./clip.vue";


@Component({
    components: {
        emoji,
        imageUpload,
        clip
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