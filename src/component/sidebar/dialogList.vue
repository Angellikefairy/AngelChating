<template>
    <div id="dialogList" @click="setSidebarChosen">
        <el-tooltip class="item" effect="dark" content="消息" placement="right">
            <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";

@Component({})
export default class DialogList extends Vue {
    setSidebarChosen() {
        this.$store.commit('setSidebarChosen','dialogList');
    }
}
</script>

<style scoped>
#dialogList {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
</style>