<template>
  <div id="linkmanMes">
    <friend-mes v-if="linkmanType === 'friend'"></friend-mes>
    <group-mes v-else-if="linkmanType === 'group'"></group-mes>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import friendMes from "./friendMes.vue";
import groupMes from "./groupMes.vue";

@Component({
    components: {
        friendMes,
        groupMes
    }
})
export default class LinkmanMes extends Vue {
  get linkmanType() {
    const {focusLinkman} = this.$store.state;
    if(focusLinkman.user_id) {
      return 'friend';
    }
    else if(focusLinkman.group_id) {
      return 'group'
    }
    else return 'friend'
  }
}
</script>

<style scoped>
#linkmanMes {
  flex: 1;
  background-color: rgba(241, 241, 241, 0.9);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>