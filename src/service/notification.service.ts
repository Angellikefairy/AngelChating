import {getPreferSetting,modifyPreferSetting} from "@/api/api";
import store from "@/store/index";
import {showMessage} from "@/util/util";

export function getAgentPermission() {
    return Notification.permission;
}

export async function getNotifiSetting() {
    const {loginState} = <any>store.state;
    if(loginState) {
        const {userBasicMes: {user_id: userId}} = <any>store.state;
        const preferSetting = await getPreferSetting(userId);
        return preferSetting.data.preferSettingMes.desktop_reminder;
    }
    else return 1;
}

export function supportNotification(): boolean {
    return ("Notification" in window);
}

export async function setNotifiPermitted() {
    const permission = Notification.permission;
    if(permission === "default") {
        const permission = await Notification.requestPermission();
        const userNotifiSetting = await getNotifiSetting();
        if(permission === 'denied' || permission === 'default') {
            store.commit('changeNotificationState',false);
        }
        if(permission === 'granted' && userNotifiSetting === 1) {
            store.commit('changeNotificationState',true);
        }
        return permission;
    }
    else if(permission === 'granted') {
        store.commit('changeNotificationState',true);
    }
    else {
        store.commit('changeNotificationState',false);
    }
}

export function createNotification(title,options) {
    if(Notification.permission === "granted") {
        const notification = new Notification(title,options);
    }
}

export function resolveFirefox(app) {
    if(Notification.permission === "default") {
        const userAgent = navigator.userAgent;
        const pattern = /Firefox\/(\S+)/g;
        if(pattern.test(userAgent)) {
          showMessage(app,'warning','Firefox浏览器默认阻止弹窗，如果您想开启消息通知功能，请前往浏览器设置中开启允许通知',0,true);
        }
    }
}
/**
 * 修改桌面通知状态（是否允许通知）
 * @param newState 
 */
export async function modifyNotification(newState) {
    if(store.state.loginState) {
        const {userBasicMes: {user_id: userId}} = <any>store.state;
        await modifyPreferSetting(userId,{
            desktop_reminder: newState ? 1 : 0
        })
    }
    store.commit('changeNotificationState',newState);
}

