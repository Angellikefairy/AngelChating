<template>
  <div id="addFriendDialog">
    <el-dialog :visible.sync="dialogVisible" center @close="onClose">
        <div id="slotHeader" slot="title">
            <el-avatar fit="contain" :size="60" :src="targetMes.avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <p>{{targetMes.name}}</p>
        </div>
        <div id="slotFooter" slot="footer">
            <el-button id="addFriendButton" type="info" @click="addFriend" :disabled="disabled">{{addFriendButtonMes}}</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Prop,Watch} from "vue-property-decorator";
import {AddFriendDialogTarget} from "@/types/friends/index";
import { Socket } from 'socket.io';
import {getDialogList} from "@/service/dialog.service";
import {getFriendsList} from "@/api/api";

@Component
export default class AddFriendDialog extends Vue {
    @Prop() visible!: boolean;
    @Prop() targetMes!: AddFriendDialogTarget;
    
    dialogVisible: boolean = false;

    onClose() {
        this.$emit('update:visible',false);
    }

    @Watch('visible')
    onVisibleChanged(val,oldVal) {
        this.dialogVisible = val;
    }

    get isFriend() {
        const {friendsMes} = this.$store.state;
        for(let friendMes of friendsMes) {
            if(friendMes.user_name === this.targetMes.name) {
                return true;
            }
        }
        return false;
    }


    get userBasicMes() {
        const {userBasicMes} = this.$store.state;
        return userBasicMes;
    }

    get addFriendButtonMes() {
        return this.isFriend?'你们已经是好友了哦':'加为好友'
    }

    @Watch('userBasicMes')
    async getFriendsList(userBasicMes) {
        if(!userBasicMes) return;
        const userId = userBasicMes.user_id;
        const friends = (await getFriendsList(userId)).data;
        if(friends) {
            const frinedsMes = Object.values(friends.friendsList).flat();
            this.$store.commit('setFriendsMes',frinedsMes);
        }
    }
    
    get disabled() {
        return !this.$store.state.loginState || this.isFriend;
    }

    addFriend() {
        const {
            socket,
            userBasicMes: {
                user_id: fromUserId
            }
        }: {socket: Socket,userBasicMes}  = this.$store.state;
        const {name: targetUserName} = this.targetMes;
        const validation: string = '';
        socket.emit('addFriend', {
            fromUserId,
            targetUserName,
            validation
        },(data)=> {
            const {targetUserMes} = data.data;
            this.$store.commit('addFriendMes',targetUserMes);
            this.dialogVisible = !this.dialogVisible;
            getDialogList(fromUserId);
            this.$message({
                duration: 0,
                showClose: true,
                message: `您和 ${targetUserName} 已经是好友了，快来一起聊天吧!`,
                type: 'success'
            })
        })

        socket.once('addFriendException',err => {
            const {message} = err;
            this.$message({
                message,
                type: 'warning'
            })
        })
    }
}

</script>

<style>
#addFriendButton {
    width: 220px;
    height: 34px;
    background-color: rgba(171, 184, 195, 0.85);
    border: 1px solid rgba(171, 184, 195, 0.85);
    margin-top: 10px;
}
#slotHeader p {
    color: #333;
    margin: 0px;
}

#addFriendDialog .el-dialog__footer {
    height: 75px;
}
#addFriendDialog .el-dialog__body {
    padding: 0px;
}
#addFriendDialog .el-dialog__header {
    background-color: #f0f2f5;
    padding: 20px 0 14px 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
#addFriendDialog .el-dialog {
    width: 300px;
    height: 192px;
    border-radius: 10px;
}
</style>