<template>
  <div id="notification">
    <el-popconfirm
    confirmButtonText='好的'
    cancelButtonText='不用了'
    icon="el-icon-info"
    iconColor="red"
    :title="popconfirmTitle"
    @onConfirm="switchNotification"
    >
        <el-tooltip slot="reference" class="item" effect="dark" content="桌面消息通知" placement="right">
            <i class="el-icon-news"></i>
        </el-tooltip>
    </el-popconfirm>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {modifyNotification,getAgentPermission} from "@/service/notification.service"


@Component
export default class Notification extends Vue {

    get notification() {
        return this.$store.state.notification;
    }

    get popconfirmTitle() {
        if(this.notification) {
            return '桌面消息通知已开启，您是否要关闭该功能？'
        }
        else {
            return '桌面消息通知未开启，您是否要开启该功能?'
        }
    }
    async switchNotification() {
        let notifiState = this.notification;
        if(getAgentPermission() !== 'granted' && notifiState === false) {
            this.$message({
                type: 'warning',
                message: '浏览器通知功能未开启，请先允许浏览器进行通知！',
                duration: 0,
                showClose: true
            })
            return;
        }
        notifiState = !notifiState;
        await modifyNotification(notifiState);
        this.$message({
            type: notifiState ? 'success' : 'info',
            message: notifiState ? '桌面消息通知已开启' :'桌面消息通知已关闭'
        })
    }
}
</script>

<style scoped>
#notification {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
</style>