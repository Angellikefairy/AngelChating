import store from "./index";
import Vue from "vue";
import { updateDialogList } from '@/service/dialog.service';
import {resolveMessageContent} from '@/service/message.service'

export default {
    /**
     * 登录成功后执行的mutation
     * @param state 
     * @param userBasicMes 
     */
    loginSucceed(state,userBasicMes) {
        store.commit('changeLoginState', true);
        store.commit('getUserBasicMes',userBasicMes);
        state.guestDefaultGroup = null;
        state.messageMap = {};
    },
    /**
     * 登出成功执行的mutation
     * @param state 
     */
    logoutSucceed(state) {
        store.commit('changeLoginState', false);
        state.userBasicMes = null;
        state.messageMap = {};
    },
    /**
     * 改变登录状态
     * @param state 
     * @param loginState 
     */
    changeLoginState(state,loginState) {
        state.loginState = loginState;
    },
    /**
     * 更新用户基本信息
     * @param state 
     * @param userBasicMes 
     */
    getUserBasicMes(state,userBasicMes) {
        state.userBasicMes = userBasicMes;
    },
    /**
     * 初始化游客的对话信息
     * @param state 
     * @param defaultGroupMes 
     */
    initGuestDialog(state,defaultGroupMes) {
        defaultGroupMes.newMesNum = 0;
        state.guestDefaultGroup = defaultGroupMes;
        const GuestDialogList = state.dialogList;
        state.dialogList = [defaultGroupMes];
    },
    /**
     * 更新游客的对话信息
     * @param state 
     * @param updateMes 
     */
    updateGuestDialogMes(state,updateMes) {
        const lastMessageMes = state.dialogList[0].lastMessage;
        const {messageFromUser,messageTarget,messageCreatedTime,messageContent} = updateMes;
        const {messageFromId,messageFromName} = messageFromUser;
        lastMessageMes.message_from_id = messageFromId;
        lastMessageMes.message_from_name = messageFromName;
        lastMessageMes.message_content = messageContent;
        lastMessageMes.message_created_time = messageCreatedTime;
        state.dialogList[0].newMesNum++;
    },
    /**
     * 初始化已登录用户的对话信息
     * @param state 
     * @param dialogList 
     */
    initDialogList(state,dialogList) {
        state.dialogList = dialogList;
    },
    /**
     * 更新对话信息
     * @param state 
     * @param dialogMes 
     */
    updateDialogMes(state,dialogMes) {
        const dialogList = state.dialogList;
        // 如果已有此对话信息则进行对话信息的更新
        for(let i=0;i<dialogList.length;i++) {
            if(dialogList[i].dialogTargetId === dialogMes.dialogTargetId) {
                Vue.set(dialogList,i,dialogMes)
                return;
            }
        }
        // 没有，则进行添加
        store.commit('addDialogMes',dialogMes);
    },
    /**
     * 添加对话信息
     * @param state 
     * @param dialogMes 
     */
    addDialogMes(state,dialogMes) {
        state.dialogList.unshift(dialogMes);
    },
    /**重置对话列表并更新对话聚焦态 */
    resetDialogList(state) {
        const defaultGroupMes = state.guestDefaultGroup;
        state.dialogList = [];
        store.commit('initGuestDialog',defaultGroupMes);
        store.commit('updateFocusState',defaultGroupMes.dialogTargetId);
    },
    /**
     * 初始化聚焦态，会话列表的第一项为聚焦态
     * @param state 
     */
    initFocusState(state) {
        let {dialogList,focusTargetId} = state;
        state.focusTargetId = dialogList[0].dialogTargetId;
    },
    /**
     * 更改dialog的聚焦状态
     * @param state 
     * @param targetId 
     */
    updateFocusState(state,targetId) {
        state.focusTargetId = targetId;
    },
    /**
     * 设置消息map
     * @param state 
     * @param dialogTargetId 
     * @param dialogId 
     * @param messages 
     */
    setMessageMap(state,dialogMes) {
        let {dialogTargetId,dialogId,messages: messageContent} = dialogMes;
        messageContent = resolveMessageContent(messageContent);
        if(!state.messageMap[dialogTargetId]) {
            Vue.set(state.messageMap,dialogTargetId,{dialogId,messageContent})
        }
        else {
            state.messageMap[dialogTargetId].messageContent.push(...messageContent);
        }
    },
    /**
     * 当收到新消息时将消息添加到消息map的对应消息列表中
     * @param state 
     * @param dialogMes 
     */
    addNewMessage(state,dialogMes) {
        let {dialogTargetId,messageContentMes:messageContent} = dialogMes;
        messageContent = resolveMessageContent([messageContent]);
        state.messageMap[dialogTargetId].messageContent.unshift(...messageContent);
    },
    /**
     * 初始化socket实例
     * @param state 
     * @param socket 
     */
    initSocket(state,socket) {
        state.socket = socket;
    },
    /**
     * 改变滑动条的位置（是否处于对话框的底部）
     * @param state 
     * @param isDown 
     */
    changeScrollDown(state,isDown: boolean) {
        state.scrollDown = isDown;
    },
    /**
     * 改变桌面消息通知状态
     * @param state 
     * @param isOpen 
     */
    changeNotificationState(state,isOpen) {
        state.notification = isOpen;
    },
    /**
     * 将指定对话的新消息数重置为0
     * @param state 
     * @param dialogTargetId 
     */
    resetNewMesNum(state,dialogTargetId) {
        const dialogList = state.dialogList;
        for(let i=0;i<dialogList.length;i++) {
            if(dialogList[i].dialogTargetId === dialogTargetId) {
                dialogList[i].newMesNum = 0;
            }
        }        
    },
    /**
     * 设置图片的加载状态
     * @param state 
     * @param loadingState 
     */
    setImageLoading(state,loadingState) {
        state.imageLoading = loadingState;
    },
    /**
     * 修改侧边栏的选择状态
     * @param state 
     * @param chosen 
     */
    setSidebarChosen(state,chosen) {
        state.sidebarChosen = chosen;
    },
    /**
     * 设置联系人的信息
     * @param state 
     * @param linkmanMes 
     */
    setFocusLinkman(state,linkmanMes) {
        state.focusLinkman = linkmanMes;
    },
    /**
     * 将每次获得的最新群组成员信息添加到全局（以groupId为属性）
     * @param state 
     * @param groupMes 
     */
    addGroupMembersToAll(state,groupMes) {
        Vue.set(state.allGroupMembers,groupMes.groupId,groupMes.groupMembers);
    },
    /**
     * 设置所有好友信息（用于第一次请求获得所有好友信息以及退出时清空好友信息）
     * @param state 
     * @param friendsMes 
     */
    setFriendsMes(state,friendsMes) {
        state.friendsMes = friendsMes;
    },
    /**
     * 当添加好友成功后，将添加的好友信息添加到friendsMes中
     * @param state 
     * @param friendMes 
     */
    addFriendMes(state,friendMes) {
        state.friendsMes.push(friendMes);
    },
    setRandombg(state,bg) {
        state.randomBackgroundImage = bg;
    }
}