<template>
  <div id="linkmans">
    <div id="tag">
        {{linkmanTag}}
    </div>
    <div id="tag-linkmans">
        <linkman v-for="item in linkmans" :key="item.group_id ? item.group_id : item.user_id" :linkman="item"></linkman>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Vue,Component,Prop,Watch} from "vue-property-decorator";
import linkman from "./linkman.vue";

@Component({
    components: {
        linkman
    }
})
export default class Linkmans extends Vue {
    @Prop() tag!: string;
    @Prop() linkmans!: any;

    get linkmanTag() {
        const tag = this.tag;
        return tag === 'groups' ? '群聊' : tag;
    }
}
</script>

<style scoped>
#linkmans {
    border-left: none;
    border-right: none;
    padding: 20px 0 0 0;
    color: rgba(247, 247, 247, 0.7);
}
#tag {
    font-size: 14px;
    margin-left: 16px;
}
</style>