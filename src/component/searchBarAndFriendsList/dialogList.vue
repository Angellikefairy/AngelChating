<template>
  <div id="friends-list">
    <dialog-item 
      v-for ="(item,index) of dialogList" 
      :key="item.dialogTargetId" 
      :dialogMes="item" 
      :index="index">
    </dialog-item>      
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator"
import dialogItem from "./dialogItem.vue";

@Component({
  components: {
    dialogItem
  }
})
export default class DialogList extends Vue {
  init: boolean = false;

  get dialogList() {
      return this.$store.state.dialogList.sort(this.sortFunction);
  }

  sortFunction(dialog1,dialog2) {
    if(this.$store.state.dialogList[0] && !this.init) {
      this.$store.commit('initFocusState');
      this.init = !this.init;
    }
    return this.getMessageTime(dialog2) - this.getMessageTime(dialog1);
  }

  getMessageTime(dialog) {
    const messageTime = dialog.lastMessage.message_created_time;
    return new Date(messageTime).getTime();
  }
}
</script>

<style scoped>
#friends-list {
    width: 100%;
    flex:1;
    overflow: scroll;
    scrollbar-width: none;
}
#friends-list::-webkit-scrollbar {
  display: none;
}
</style>