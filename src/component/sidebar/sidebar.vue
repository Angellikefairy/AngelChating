<template>
  <div id="sidebar">
    <el-avatar v-if="loginState" id="sidebar-avatar" fit="contain" :size="60" :src="userBasicMes.user_avatar" @error="errorHandler">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
    </el-avatar>


    <div id="sidebar-list">
      <dialog-list v-if="loginState"></dialog-list>
      <linkman-list v-if="loginState"></linkman-list>
      <notification></notification>
      <github-link></github-link>
      <about></about>
      <logout v-if="loginState"></logout>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import logout from "./logout.vue";
import about from "./about.vue";
import githubLink from "./githubLink.vue";
import notification from "./notification.vue";
import linkmanList from "./linkmanList.vue";
import dialogList from "./dialogList.vue";

@Component({
  components: {
    logout,
    about,
    githubLink,
    notification,
    linkmanList,
    dialogList
  }
})
export default class Sidebar extends Vue {
  errorHandler() {
    //
  }

  get loginState() {
    return this.$store.state.loginState;
  }

  get userBasicMes() {
    return this.$store.state.userBasicMes;
  }
}
</script>


<style>
#sidebar-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 40px;
}
#sidebar {
  width: 7.5%;
  height: 100%;
  background-color: rgba(171, 184, 195, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  position: relative;
  opacity: 1;
}
#sidebar-avatar {
  margin-top: 50px;
  cursor: pointer;
}
#sidebar i {
    font-size: 26px;
    color: rgba(247, 247, 247, 0.7);
    cursor: pointer;
}
</style>