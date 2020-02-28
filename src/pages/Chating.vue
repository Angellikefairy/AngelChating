<template>
  <div id="chating">
    <!--设置毛玻璃效果 通过filter: blur() -->
    <div id="back-blur" :style="appBackgroundImage"></div>
    <sidebar></sidebar>
    <list></list>
    <keep-alive>
      <chat v-if="sidebarChosen === 'dialogList'"></chat>
      <linkman-mes v-else></linkman-mes>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Inject} from "vue-property-decorator";
import sidebar from '../component/sidebar/sidebar.vue';
import list from '../component/searchBarAndFriendsList/searchBarAndFriendsList.vue';
import chat from '../component/chat/chat.vue';
import linkmanMes from "../component/linkmanMes/linkmanMes.vue";
import client from 'socket.io-client';
import {Socket} from 'socket.io';
import {onConnectMessage} from '../api/websocket';
import {disconnnect} from "../service/websocket.service"
import {showMessage} from "@/util/util";


import {loginByToken,logout as tryLogout} from '../service/user.service';
import {guestJoinDefaultGroup,userLoginAndReceiveMessage} from "../service/websocket.service";
import {supportNotification,setNotifiPermitted,getNotifiSetting} from "@/service/notification.service"
import {getPreferSetting} from "@/api/api";

@Component({
  components: {
    sidebar,
    list,
    chat,
    linkmanMes
  }
})
export default class Chating extends Vue {
    socket: any;

    logout() {
      const userId = this.$store.state.userBasicMes.user_id;
      tryLogout(this,userId);
    }

    get sidebarChosen() {
      return this.$store.state.sidebarChosen;
    }

    get loginState() {
      return this.$store.state.loginState;
    }

    get userBasicMes() {
      const userBasicMes = this.$store.state.userBasicMes;
      this.setNotification(userBasicMes);
      return userBasicMes;
    }

      get appBackgroundImage() {
        const bg = this.$store.state.randomBackgroundImage;
        return {
          backgroundImage: "url(" + require(`../assets/${bg}.jpg`) + ")"
        };
    }

    /**
     * 每次重新渲染该组件,created方法就会被重新调用，因此，将上一次连接的socket断开后
     * 再开启新的socket连接
     */
    async created() {
      await loginByToken(this);
      const {userBasicMes,loginState,socket} = this.$store.state;
      if(socket) {
        disconnnect();
      }
      if(!loginState) {
        if(Notification.permission === 'granted' ) {
          this.$store.commit('changeNotificationState',true);
        }
        guestJoinDefaultGroup(this);
      }
      else {
        const {user_id: userId} = userBasicMes;
        await userLoginAndReceiveMessage(this,userId);
      }
    }

    async setNotification(userBasicMes) {
      if(userBasicMes) {
        const setting = await getNotifiSetting();
        if(setting === 0) {
          this.$store.commit('changeNotificationState',false);
          return;
        }
      }
      if(!supportNotification) {
        showMessage(this,'warning','当前浏览器不支持桌面消息通知。为了您更好的用户体验，推荐使用Chrome和Firefox',0,true);
      }
      else {
        const permission = await setNotifiPermitted();
        if(permission === 'denied') {
          showMessage(this,'warning','开启通知后可以支持桌面消息通知，您之后可以在 应用设置/浏览器设置 中重新进行设置!',0,true);
        }
      }
    }
}
</script>

<style scoped>
#chating {
    width: 70%;
    height: 90%;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    opacity: 1;
    overflow: hidden;
}
#back-blur {
  background-repeat: no-repeat;
  background-size: 1920 1080 cover;
  background-position: -230.4px -15.2px;
  width: 70%;
  height: 90%;
  position: absolute;
  left: 15%;
  top: 5%;
  filter: blur(10px);
}
</style>