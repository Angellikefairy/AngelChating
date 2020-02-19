<template>
  <div id="searchBarAndFriendsList">
    <search-bar></search-bar>
    <keep-alive>
      <dialog-list v-if="siderbarChosen === 'dialogList'"></dialog-list>
      <linkman-list v-else></linkman-list>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import dialogList from "./dialogList.vue";
import searchBar from "./searchBar.vue";
import linkmanList from "./linkmanList/linkmanList.vue";

@Component({
    components: {
        dialogList,
        searchBar,
        linkmanList
    }
})
export default class SearchBarAndFriendsList extends Vue {
  get siderbarChosen() {
    return this.$store.state.sidebarChosen;
  }
}
</script>

<style scoped>
#searchBarAndFriendsList {
    width: 28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(171, 184, 195, 0.5);
    position: relative;
}
</style>