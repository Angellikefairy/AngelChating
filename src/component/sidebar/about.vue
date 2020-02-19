<template>
  <div id="about">
    <el-tooltip class="item" effect="dark" content="关于" placement="right">
        <svg @click="showAbout" t="1580883482991" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" width="30" height="30"><path d="M512 32C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 512 96s416 185.6 416 416-185.6 416-416 416z" p-id="2390" fill="#F7F7F7"></path><path d="M512 416c-25.6 0-48 22.4-48 48v256c0 25.6 22.4 48 48 48s48-22.4 48-48v-256c0-25.6-22.4-48-48-48z" p-id="2391" fill="#F7F7F7"></path><path d="M512 304m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" p-id="2392" fill="#F7F7F7"></path></svg>
    </el-tooltip>
    <about-content :visible.sync="isShow"></about-content>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import aboutContent from "./aboutContent.vue";

@Component({
    components: {
        aboutContent
    }
})
export default class About extends Vue {
    isShow: boolean = false;

    showAbout() {
        this.isShow = true;
    }
}
</script>

<style scoped>
#about {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
svg {
    width: 25px;
    height: 25px;
    fill-opacity: 0.7;
}
</style>