<template>
  <div id = "register">
    <register-component state="register" id="register-component" :button="button" :link="link"></register-component>
  </div>
</template>


<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import RegisterComponent from "../component/LoginAndRegister/LoginAndRegister.vue"

@Component({
  components: {
    RegisterComponent
  }
})
export default class Register extends Vue {
  button = {
    buttonName: '注册',
    buttonStyle: {
      "background-color": '#ff6c6f'
    }
  };
  link = {
    linkName: ' sign in',
    linkPre: 'Already have an account?',
    linkTarget: '/login',
    linkStyle: {
      color: '#ff6f72'
    }
  };
}
</script>


<style scoped>
#register {
    width: 70%;
    height: 90%;
    background: url('../assets/register.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
}
#register-component {
  margin-top: 143px;
  margin-left: 69px;
}
</style>