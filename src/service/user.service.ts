import {
    register as userRegister,
    login as userLogin,
    loginByToken as userLoginByToken,
    logout as userLogout
} from "../api/api"

import {showMessage} from "@/util/util";

import {
    resetDialogList
} from "./dialog.service"

import {
    guestJoinDefaultGroup,
    disconnnect
} from "./websocket.service";

import Vue from 'vue'
import store from "../store/index"


// 用户注册
export async function register(app: Vue,userName: string,password: string) {
    const registerMes = await userRegister(userName,password);
    if(registerMes.data) {
        const onClose = () => {
            loginByPassword(app,userName,password);
        }
        showMessage(app,'success','注册成功！正为您自动登录！',1500,false,onClose);
    }
    else {
        showMessage(app,'error',`${registerMes.message}! 请重新进行注册!`);
    }
}

// 用户通过账密进行登录并将Token添加到浏览器缓存用于下次的自动登录
export async function loginByPassword(app: Vue,userName: string,password: string) {
    const loginMes = await userLogin(userName,password);
    if(loginMes.data) {
        showMessage(app,'success','登录成功!');
        const {/*message,*/accessToken,userBasicMes} = loginMes.data;
        app.$router.push('/');
        store.commit('loginSucceed',userBasicMes);
        localStorage.setItem('Token',accessToken);
    }
    else {
        showMessage(app,'error',`${loginMes.message}!`,0,true);
    }
}

// 通过JWT自动进行登录
export async function loginByToken(app: Vue) {
    const token = localStorage.getItem('Token');
    if(token) {
        const loginMes = await userLoginByToken(token);
        if(loginMes.data) {
            const {/*message,*/userBasicMes} = loginMes.data;
            store.commit('loginSucceed',userBasicMes);
        }
        else {
            showMessage(app,'error',`${loginMes.message}!`,0,true);
        }
    }
}

// 用户登出并断开socket连接以及将缓存Token清除
export async function logout(app: Vue,userId: string) {
    const loginoutMes = await userLogout(userId);
    if(loginoutMes.data) {
        store.commit('logoutSucceed');
        store.commit('setFocusLinkman',{});
        store.commit('setSidebarChosen','dialogList');
        store.commit('setFriendsMes',[]);
        showMessage(app,'success','您已成功退出登录',1500);
        disconnnect();
        localStorage.removeItem('Token');
        guestJoinDefaultGroup(app);
    }
}

