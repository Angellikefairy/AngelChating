<template>
  <div id="login-and-register">
    <div id="title">
        <h3>Welcome to</h3>
        <h1>Chating</h1>
    </div>
    <div id="loginAndRegister-input">
        <div id="username-input">
            <label>Username</label>
            <el-input class="input" type="text" autocomplete="new-password" v-model="userName" clearable @blur="checkNull(userName,'用户名')"></el-input>
        </div>
        <div id="password-input">
            <label>Password</label>
            <el-input class="input" type="password" autocomplete="new-password" v-model="password" show-password @keyup.enter.native="LoginAndRegister"></el-input>
        </div>
    </div>
    <el-button round id="button" :style="button.buttonStyle" @click="LoginAndRegister">{{button.buttonName}}</el-button>
    <p id="notice">
        {{link.linkPre}}<router-link id="link" :to="link.linkTarget" :style="link.linkStyle">{{link.linkName}}</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import {Vue,Prop,Component} from 'vue-property-decorator';
import {register,loginByPassword} from '@/service/user.service';
import {showMessage} from "@/util/util";

@Component({})
export default class LoginAndRegister extends Vue {
    @Prop() state: string | undefined;
    @Prop() button: any;
    @Prop() link: any;

    userName: string = '';
    password: string = '';

    LoginAndRegister(){
        if(this.state === 'register') {
            if(this.userName === '' || this.password === '') {
                showMessage(this,'warning','用户名或密码不允许为空哦!');
                return;
            }
            register(this,this.userName,this.password);
        }
        else {
            const isNull = this.checkNull(this.password,'密码');
            if(isNull) return;
            loginByPassword(this,this.userName,this.password);
        }
    }

    checkNull(value,key) {
        if(value === '') {
            showMessage(this,'warning',`${key}不允许为空哦！`);
            return true;
        }
        else return false;
    }
}
</script>

<style>
#link {
    font-weight: 550;
}
#notice {
    margin-top: 80px;
    font-size: 12px;
    color: #584cd0;
    font-weight: 500;
}
#loginAndRegister-input .el-input__inner {
    color: #817caa;
    font-size: 17px;
    border: 0px;
    border-bottom: 2px solid #d2cfe2;
    border-radius: 0px;
    padding-left: 0px;
}
#loginAndRegister-input .el-input {
    width: 245px;
    height: 20px;
}
#button {
    margin-top: 37px;
    height: 40px;
    width: 125px;
    border-radius: 20px;
    color: white;
    font-size: 14px;
}


#username-input {
    margin-bottom: 30px;
}
#loginAndRegister-input {
    margin-top: 60px;
}
label {
    display: block;
    font-size: 15px;
    color: #877ad4;
    margin-bottom: 0px;
}
h3 {
    color: #877ad4
}
h1 {
    color: #251876;
    font-weight: 600;
    font-size: 35px;
}
h1,h3 {
    margin: 0px;
}
</style>