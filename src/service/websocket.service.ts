import store from "../store/index";
import client from 'socket.io-client';
import {socketUrl} from "../config/env";
import {getDialogList,updateDialogList} from '../service/dialog.service';
import {addNewMessage} from "../service/message.service"
import { Socket } from 'socket.io';
import {showMessage} from "@/util/util";


/**
 * 游客加入默认房间并监听群消息
 * @param app 
 */
export function guestJoinDefaultGroup(app) {
    app.socket = client(socketUrl);
    // 将socket实例放到全局状态进行管理
    store.commit('initSocket',app.socket);
    app.socket.emit('guest','',data => {
      const {
        groupId: dialogTargetId,
        groupName: dialogTargetName,
        groupAvatar: avatar,
        groupType,
        roomUserNum
        } = data.data.joinMes;
      const lastMessage = data.data.lastMessage;
      store.commit('initGuestDialog', {
        dialogTargetType: 'group',
        dialogTargetId,
        dialogTargetName,
        lastMessage,
        avatar,
        roomUserNum
      });
      store.commit('initFocusState');
      store.commit('changeScrollDown',true);
    })
    app.socket.on('groupMemberMessage',groupMessage => {
      store.commit('updateGuestDialogMes',groupMessage);
      addNewMessage(groupMessage);
      store.commit('changeScrollDown',true);
    })
}

/**
 * 用户登录并监听消息的接受
 * @param app 
 * @param userId 
 */
export async function userLoginAndReceiveMessage(app,userId) {
      app.socket = client(socketUrl,{
          query: {
            userId
          }
      });
      // 将socket实例放到全局状态进行管理
      store.commit('initSocket',app.socket);
      await getDialogList(userId,1,50);
      app.socket.on('messageFromFriend', resolveReceiveMes)
      app.socket.on('groupMemberMessage', resolveReceiveMes)
      addFriendInfo(app.socket,app);
}

/**
 * 处理监听收到的消息
 * @param message 
 */
function resolveReceiveMes(message) {
  addNewMessage(message);
  updateDialogList(message);
  store.commit('changeScrollDown',true);
}

/**
 * 断开socket连接
 */
export function disconnnect() {
  let socket: Socket | null = store.state.socket;
  if(socket) {
    (socket as Socket).disconnect(true);
  }
}
/**
 * 监听用户发来的好友请求
 * @param socket 
 * @param app 
 */
export function addFriendInfo(socket: Socket,app) {
  socket.on('addFriendInfo',data => {
    const {
      userBasicMes: {
          user_id: userId
      }
  } = (store.state as any);
    const {fromUserName,fromUserAvatar} = data;
    getDialogList(userId);
    showMessage(app,'info',`${fromUserName} 发来了一条好友请求，
    系统默认为您自动同意该请求！快去和他聊天吧！`,0,true);
  })
}