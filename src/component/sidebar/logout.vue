<template>
    <div id="logout">
        <el-tooltip class="item" effect="dark" content="退出登录" placement="right">
            <i class="el-icon-switch-button" @click="logout"></i>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {logout} from "@/service/user.service";

@Component({})
export default class LogOut extends Vue {
    logout() {
        const userId = this.$store.state.userBasicMes.user_id;
        logout(this,userId);
    }

    mounted() {
        document.onkeyup = (e: KeyboardEvent) => {
            const _this = this;
            if(e.altKey && e.keyCode === 81) {
                _this.logout();
            }
        }
    }
}
</script>

<style scoped>
#logout {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
</style>