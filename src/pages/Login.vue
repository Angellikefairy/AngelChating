<template>
  <div id = "login">
    <keep-alive>
      <login-component id="login-component" state="login" :button="button" :link="link"></login-component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import LoginComponent from "../component/LoginAndRegister/LoginAndRegister.vue"

@Component({
  components: {
    LoginComponent
  }
})
export default class Login extends Vue {
  button = {
    buttonName: '登录',
    buttonStyle: {
      "background-color": '#af51c3'
    }
  };
  link = {
    linkName: ' sign up',
    linkPre: 'Dont hava an account?',
    linkTarget: '/register',
    linkStyle: {
      color: '#b562c7'
    }
  };
}
</script>

<style scoped>
#login {
    width: 70%;
    height: 90%;
    background-color: aquamarine;
    background: url('../assets/login.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
}
#login-component {
  margin-top: 143px;
  margin-left: 69px;
}
</style>