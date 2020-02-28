<template>
  <div id="app" :style="appBackgroundImage">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Vue,Component,ProvideReactive} from "vue-property-decorator";

@Component
export default class App extends Vue {
  bgStyle: any;

  get appBackgroundImage() {
    const randomNum = Math.floor(Math.random()*23+1);
    this.bgStyle = {
        backgroundImage: "url(" + require(`./assets/${randomNum}.jpg`) + ")"
    }
    this.$store.commit('setRandombg',`${randomNum}`);
    return this.bgStyle;
  }
}
</script>

<style>
html,body {
  width: 100%;
  height: 100%;
  margin: 0px;
  font-family: 'local-file', 'Arial', 'Verdana', '微软雅黑', '黑体', 'serif';
  user-select: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e6f0;
  background-size: 1920px 1080px cover;
  background-repeat: no-repeat;
}
</style>
