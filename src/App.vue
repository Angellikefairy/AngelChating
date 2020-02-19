<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

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
  background-image: url(./assets/background.jpg);
  background-size: 1920px 1080px;
  background-repeat: no-repeat;
}
</style>
