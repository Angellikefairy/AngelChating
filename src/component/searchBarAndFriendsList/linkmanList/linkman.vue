<template>
  <div id="linkman" :class="['flex',focusState ? 'linkmanFocus' : '']" @click="setFocusLinkman">
    <el-avatar id="linkman-avatar" fit="contain" :size="42" :src="solveLinkman.avatar">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
    </el-avatar>
    <p class="linkman-name">
        {{solveLinkman.name}}
    </p>   
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Vue,Component,Prop} from "vue-property-decorator";

@Component
export default class Linkman extends Vue {
    @Prop() linkman!: any;

    get focusState() {
      const {focusLinkman} = this.$store.state;
      if(this.linkman.user_id) {
        return this.linkman.user_id === focusLinkman.user_id;
      }
      else return this.linkman.group_id === focusLinkman.group_id;
    }

    setFocusLinkman() {
      this.$store.commit('setFocusLinkman',this.linkman);
    }

    get solveLinkman() {
      const linkman = this.linkman;
      if(linkman.group_id) {
        return {
          name: linkman.group_name,
          avatar: linkman.group_avatar,
          id: linkman.group_id,
          type: 'group'
        }
      }
      else return {
        name: linkman.user_name,
        avatar: linkman.user_avatar
      }
    }
}
</script>

<style scoped>
#linkman {
  width: 100%;
  height: 70px;
  justify-content: flex-start;
  align-items: center;
  color: rgba(247, 247, 247, 1);
  padding: 0 16px;
}
#linkman:hover {
  background-color: rgba(171, 184, 195, 0.4);
}
.linkmanFocus {
  background-color: rgba(171, 184, 195, 0.4);
}
.flex {
    display: flex;
    flex-direction: row;
}
.center {
    justify-content: center;
    align-items: center;
}
.linkman-name {
    margin-left: 16px;
}
</style>