<template>
  <div id="searchBar">
    <el-input
        id="search-input"
        placeholder="搜索用户和群组"
        prefix-icon="el-icon-search"
        :disabled="disabled"
        v-model="input"
        @focus="showSearchInfo"
        >
    </el-input>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import {showMessage} from "@/util/util";

@Component({})
export default class SearchBar extends Vue {
    input = '';

    get disabled(): boolean {
        return !this.$store.state.loginState;
    }

    showSearchInfo() {
        showMessage(this,'info','搜索功能还在研发中哦！如果您想要添加好友，前往群组中点击头像即可添加！',0,true);
    }
}
</script>

<style>
#searchBar el-input__inner {
    padding-left: 35px;
}
#searchBar .el-input__icon {
    font-size: 17px;
    line-height: 35px;
}
#searchBar .el-input {
    width: 90%;
}
#searchBar #search-input {
    height: 36px;
    border-radius: 18px;
}
#searchBar {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>