<template>
  <div id="groupMes" class="columnFlex">
    <chat-header :name="groupMesName" :display="false"></chat-header>
    <div id="members-content"> 
      <div class="member" v-for="item in groupMembersMes" :key="item.user_id" @click="openAddFriendDialog(item)">
        <el-avatar fit="contain" :size="50" :src="item.user_avatar">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <p>{{item.user_name}}</p>          
      </div>
      <!-- 使用占位元素(在这里是有宽度无高度)(个数应大于等于最大列数)来使得flex布局的最后一行可以左对齐
            占位元素可以使得最后一行的剩余空间都会有占位元素来布满一行，因此，最后一行也能获得想要的flex布局效果
      -->
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <add-friend-dialog :visible.sync="dialogVisible" :targetMes="targetMes"></add-friend-dialog>
    <div id="groupMes-fotter">
      <el-button id="sendMessage-button" type="success" round @click="toGroupDialog">发消息</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from "vue-property-decorator";
import chatHeader from "../chat/chatHeader.vue";
import addFriendDialog from "../Friends/addFriendDialog.vue";
import {getGroupMembers} from "@/api/api";

@Component({
  components: {
    chatHeader,
    addFriendDialog
  }
})
export default class GroupMes extends Vue {
  dialogVisible: boolean = false;
  targetMes = {
      avatar: '',
      name: '',
      dialogType: 0
  };

  openAddFriendDialog(userMes) {
    this.dialogVisible = true;
    this.targetMes.avatar = userMes.user_avatar;
    this.targetMes.name = userMes.user_name;
  }

  /**
   * 群聊信息
   */
  get groupMes() {
    const {focusLinkman} = this.$store.state;
    if(focusLinkman.group_id) {
      this.addGroupMembersMesToAll(focusLinkman);
      return focusLinkman;
    }
    else return {};
  }

  /**
   * 群聊成员关系信息
   */
  get groupMembers() {
    const {allGroupMembers} = this.$store.state;
    const groupId = this.groupMes.group_id;
    if(groupId in allGroupMembers) {
      return allGroupMembers[groupId];
    }
    else return {};
  }
  /**
   * 群聊成员的基本信息集合
   */
  get groupMembersMes() {
    return this.groupMembers.groupMembersMes;
  }

  get groupMesName() {
    return `${this.groupMes.group_name}（${this.groupMembers.groupMembersCount}）`
  }
  /**
   * 将请求到的群聊成员信息添加到store中
   */
  async addGroupMembersMesToAll(groupMes) {
    if(groupMes.group_id) {
      const groupId = groupMes.group_id;
      const groupMembers = (await getGroupMembers(groupId)).data;
      if(!groupMembers) {
        this.$message({
          type: 'warning',
          message: '群组信息获取失败',
          showClose: true
        })
      }
      else {
        const {allGroupMembers} = this.$store.state;
        if(groupId in allGroupMembers) return;
        this.$store.commit('addGroupMembersToAll',{
          groupId,
          groupMembers
        })
      }
    }
  }

  toGroupDialog() {
    const {group_id: groupId} = this.groupMes;
    if(!groupId) return;
    const {focusTargetId,dialogList} = this.$store.state;
    this.$store.commit('setSidebarChosen','dialogList');
    for(let dialog of dialogList) {
      if(dialog.dialogTargetId === groupId) {
        this.$store.commit('updateFocusState',groupId);
      }
    }
  }

}
</script>

<style scoped>
i {
  width: 70px;
  height: 0;
}
.member {
  width: 70px;
  height: 100px;
  padding: 8px;
  cursor: pointer;
}
.member:hover {
  background-color: rgba(171, 184, 195, 0.1);
}
.member p {
  margin: 0px;
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #A4A4A4;
}
#groupMes {
  width: 100%;
  height: 100%;
}
.columnFlex {
  display: flex;
  flex-direction: column;
}
#members-content {
  margin-top: 20px;
  overflow-y: scroll;
  padding: 0 90px;
  width: 100%;
  height: 470px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
}
#members-content::-webkit-scrollbar {
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
#sendMessage-button {
  margin-top: 35px;
  width: 140px;
}
#groupMes-fotter {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>