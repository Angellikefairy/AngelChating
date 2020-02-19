<template>
  <div id="friendMes">
    <div class="friendMes-header">
      <div id="friend-name">
        {{friendMes.user_name}}
      </div>
      <div id="friend-avatar">
        <el-avatar id="item-avatar" fit="contain" :size="60" :src="friendMes.user_avatar">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </div>
    </div>
    <div id="friendMes-content">
      <div v-for="item in friendMesContent" :key="item.title" class="friendMes-item">
        <label>{{item.title}}</label>
        <p>{{item.description}}</p>
      </div>
    </div>
    <div id="frinedMes-fotter">
      <el-button id="sendMessage-button" type="success" round :disabled="buttonDisabled" @click="toFriendDialog">发消息</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {getDialogList} from "@/service/dialog.service";

@Component
export default class FriendMes extends Vue {
  get friendMes() {
    let friendMes;
    const {focusLinkman,userBasicMes} = this.$store.state;
    if(Object.keys(focusLinkman).length === 0) {
      friendMes = userBasicMes ? userBasicMes : {};
    }
    else friendMes = focusLinkman;
    return friendMes;
  }

  get buttonDisabled() {
    if(!this.$store.state.userBasicMes) {
      return false;
    }
    return this.friendMes.user_id === this.$store.state.userBasicMes.user_id;
  }

  get friendMesContent() {
    const {user_state,user_reg_time,user_lastLogin_time} = this.friendMes;
    return [
      {
        title: '当前状态',
        description: user_state === 1 ? '在线' : '离线'
      },
      {
        title: '注册时间',
        description: new Date(user_reg_time).toLocaleDateString()
      },
      {
        title: '上次登录',
        description: new Date(user_lastLogin_time).toLocaleString()
      }
    ]
  }
  /**
   * 点击发送消息按钮调到对话框
   */
  async toFriendDialog() {
    const {user_id: userId} = this.friendMes;
    const {focusTargetId,dialogList,userBasicMes} = this.$store.state;
    this.$store.commit('setSidebarChosen','dialogList');
    for(let dialog of dialogList) {
      if(dialog.dialogTargetId === userId) {
        this.$store.commit('updateFocusState',userId);
      }
    }
  }
}
</script>

<style scoped>
#friendMes {
  width: 370px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.friendMes-header {
  width: 100%;
  height: 150px;
  font-size: 20px;
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(208, 208, 208, 0.6);
}
#friendMes-content {
  border-bottom: 1px solid rgba(208, 208, 208, 0.6);
  padding: 30px 0; 
}
#friendMes-content p {
  display: inline;
  margin-left: 40px;
}
.friendMes-item {
  margin-bottom: 16px;
}
.friendMes-item:last-child {
  margin-bottom: 0px;
}
#frinedMes-fotter {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#sendMessage-button {
  margin-top: 39px;
  width: 140px;
}
label {
  color: #A4A4A4;
  display: inline;
}
</style>