<template>
    <div id="linkmanList" @click="setSidebarChosen">
        <el-tooltip class="item" effect="dark" content="联系人" placement="right">
            <i class="el-icon-user"></i>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";

@Component({})
export default class LinkmanList extends Vue {
    setSidebarChosen() {
        this.$store.commit('setSidebarChosen','linkmanList');
    }
}
</script>

<style scoped>
#linkmanList {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
</style>