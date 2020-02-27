<template>
  <div id="linkman-list">
    <div v-for="(item,index) in linkmanList" :key="item.userId">
        <!-- 使用v-for遍历对象时index指向对象属性，item指向对象的属性值 -->
        <linkmans :tag="index" :linkmans="item"></linkmans>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from "vue-property-decorator";
import linkmans from "./linkmans.vue";
import {getFriendsList,getGroupList} from "@/api/api";
import { mapState } from 'vuex';


@Component({
    components: {
        linkmans
    }
})
export default class LinkmanList extends Vue {
    linkmanList = {};

    get userId() {
        const {loginState,userBasicMes} = this.$store.state;
        if(loginState && userBasicMes) {
            return userBasicMes.user_id;
        }
        return '';
    }

    async created() {
        await this.getLinkmanList();
        this.$store.watch(state => state.friendsMes , friendsMes => {
            if(friendsMes.length !== 0) {
                this.getLinkmanList();
            }
        });
    }


    async getLinkmanList() {
        const groupListPromise = getGroupList(this.userId);
        const friendsListPromise = getFriendsList(this.userId);
        const linkmanList = await Promise.all([groupListPromise,friendsListPromise]);
        linkmanList.forEach(linkman => {
            const data = linkman.data;
            if(!data) {
                this.showWarning();
            }
            if(data.groupList) {
                this.linkmanList = {groups: data.groupList};
            }
            if(data.friendsList) {
                this.linkmanList = {...this.linkmanList,...data.friendsList}
            }
        })
    }

    showWarning() {
        this.$message({
            type: 'warning',
            message: '联系人数据获取失败',
            showClose: true
        })        
    }


}
</script>

<style scoped>
#linkman-list {
    width: 100%;
    flex: 1;
    overflow: scroll;
    scrollbar-width: none;
}
#linkman-list::-webkit-scrollbar {
  display: none;
}
</style>