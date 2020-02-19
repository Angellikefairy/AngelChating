<template>
  <div id="chat" 
    v-loading="loading" 
    element-loading-text="拼命发送中..." 
    element-loading-background="rgba(171, 184, 195, 0.3)"
  >
    <chat-header></chat-header>
    <chat-content></chat-content>
    <chat-input></chat-input>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";

import chatHeader from "./chatHeader.vue";
import chatContent from "./chatContent.vue";
import chatInput from "./chatInput.vue";

@Component({
  components: {
    chatHeader,
    chatContent,
    chatInput
  }
})
export default class Chat extends Vue {
  get loading() {
    return this.$store.state.imageLoading;
  }
}
</script>

<style scoped>
#chat {
    flex: 1;
    background-color: rgba(241, 241, 241, 0.6);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
}
</style>