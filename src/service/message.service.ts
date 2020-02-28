import {
    getHistoryMessages,
    getGuestHistoryMessages
} from "../api/api"


import {updateDialogList} from "@/service/dialog.service";
import {createNotification,getNotifiSetting} from "@/service/notification.service"
import {getDialogId} from "./dialog.service"

import {Message} from "../interface/interface"

import store from "../store/index"
import {resolveTime,resolveEmoji,showMessage} from "@/util/util"

/**
 * 获得历史消息
 * dialog为undefined时，表示是游客需要获得默认群组的历史消息
 * 否则，为已登录用户需要获得历史消息
 * @param dialogId 
 * @param page 
 * @param limit 
 */
export async function historyMessages(dialogId,page,limit) {
    let historyMes;
    if(dialogId) {
        historyMes = await getHistoryMessages(dialogId,page,limit);
    }
    else {
         historyMes = await getGuestHistoryMessages(page,limit);
    }
    if(historyMes.data) {
        const {
            curPage,
            messageNum,
            pageSum,
            historyMessages: historyMessagesMes
        } = historyMes.data;
        let messages: Array<Message> = [];
        historyMessagesMes.forEach(historyMessage => {
            const {
                messageId,
                messageFromMes: {
                    fromId: fromId,
                    fromName: fromName,
                    fromAvatar: fromAvatar,
                    fromState: fromState
                },
                messageToMes: {
                    targetId,
                    targetName,
                    targetAvatar,
                    targetState
                },
                messageType,
                messageContent,
                messageContentType,
                messageCreatedTime
            } = historyMessage;
            messages.push({
                messageId,
                messageFromMes: {
                    fromId,
                    fromName,
                    fromAvatar,
                    fromState
                },
                messageTargetMes: {
                    targetId,
                    targetName,
                    targetAvatar,
                    targetState
                },
                messageContent,
                messageContentType,
                messageCreatedTime,
                messageType
            })
        })
        return messages;
    }
    else {
        //
    }
}

/**
 * 将收到的消息添加入消息列表
 * @param message 
 */
export async function addNewMessage(message) {
    let dialogTargetId: string;
    const {
        messageId,
        messageFromUser: {
            messageFromId: fromId,
            messageFromName: fromName,
            messageFromAvatar: fromAvatar,
            messageFromState: fromState
        },
        messageTarget: {
            messageToId: targetId,
            messageToAvatar: targetAvatar,
            messageToName: targetName,
            messageToState: targetState
        },
        messageContent,
        messageContentType,
        messageType,
        messageCreatedTime
    } = message;
    if(messageType === 0) {
        dialogTargetId = fromId;
    }
    else {
        dialogTargetId = targetId;
    }
    let messageContentMes: Message = {
        messageId,
        messageFromMes: {
            fromId,fromAvatar,fromName,fromState
        },
        messageTargetMes: {
            targetId,targetAvatar,targetName,targetState
        },
        messageContent,
        messageContentType,
        messageCreatedTime,
        messageType
    }
    const dialogId = await getDialogId(dialogTargetId);
    //  如果消息map中没有对应的targetId消息列表，则进行创建
    if(!store.state.messageMap[dialogTargetId]) {
        await store.dispatch('resolveMessageMap',{
            dialogId,
            dialogTargetId,
            page: 1,
            limit: 50
        })
    }
    // 如果有，则将消息unshift入消息列表
    else store.commit('addNewMessage',{
        dialogId,dialogTargetId,messageContentMes
    })
    // 如果用户偏好设置中允许有桌面消息通知
    if(store.state.notification) {
        const {fromAvatar: notifiFromAvatar,fromName: notifiFromName} = messageContentMes.messageFromMes;
        const {targetAvatar: notifiTargetAvatar,targetName: notifiTargetName} = messageContentMes.messageTargetMes;
        let notificationContent: string;
        let notificationTile: string;
        let notificationAvatar: string;
        if (/image\/(gif|jpeg|jpg|png|svg)/g.test(message.messageContentType)) {
            notificationContent = `[图片]`
        }
        else {
            notificationContent = resolveEmoji(message,'messageContent');
        }
        if(messageType === 0) {
            notificationTile = `好友 ${notifiFromName} 向您发来了一条新消息:`;
            notificationAvatar = notifiFromAvatar;
        }
        else {
            notificationTile = `群组 ${notifiTargetName} 新增一条成员信息`;
            notificationAvatar = notifiTargetAvatar;
            notificationContent = `${notifiFromName}: ` + notificationContent;
        }
        createNotification(notificationTile,{
            body: notificationContent,
            icon: notificationAvatar
        })
    }
}
/**
 * 将用户发出的消息加入消息列表
 * @param message 
 */
export async function addUserSendedMessage(message) {
    let dialogTargetId: string;
    const {
        messageId,
        messageFromUser: {
            messageFromId: fromId,
            messageFromName: fromName,
            messageFromAvatar: fromAvatar,
            messageFromState: fromState
        },
        messageTarget: {
            messageToId: targetId,
            messageToAvatar: targetAvatar,
            messageToName: targetName,
            messageToState: targetState
        },
        messageContent,
        messageContentType,
        messageType,
        messageCreatedTime
    } = message;
    dialogTargetId = targetId;
    let messageContentMes: Message = {
        messageId,
        messageFromMes: {
            fromId,fromAvatar,fromName,fromState
        },
        messageTargetMes: {
            targetId,targetAvatar,targetName,targetState
        },
        messageContent,
        messageContentType,
        messageCreatedTime,
        messageType
    }
    const dialogId = await getDialogId(dialogTargetId);
    //  如果消息map中没有对应的targetId消息列表，则进行创建
    if(!store.state.messageMap[dialogTargetId]) {
        await store.dispatch('resolveMessageMap',{
            dialogId,
            dialogTargetId,
            page: 1,
            limit: 50
        })
    }
    // 如果有，则将消息unshift入消息列表
    else store.commit('addNewMessage',{
        dialogId,dialogTargetId,messageContentMes
    })
}

export function resolveMessageContent(messageContent) {
    const userBasicMes = store.state.userBasicMes !== null ? store.state.userBasicMes : {};
    return messageContent.map(message => {
        // 自己
        if(message.messageFromMes.fromId === (userBasicMes as any).user_id) {
            message.position = 'right';
            message.rightSide = getFromMes(message);
        }
        // 另一方
        else {
            message.position = 'left';
            message.leftSide = getFromMes(message);
        }
        message.messageCreatedTime = resolveTime(message.messageCreatedTime,' '+new Date(message.messageCreatedTime).toTimeString().slice(0,5));
        return message;
    })
}

export function getFromMes(message) {
    const mesFrom = message.messageFromMes;
    return {
        avatar: mesFrom.fromAvatar,
        id: mesFrom.fromId,
        name: mesFrom.fromName,
        state: mesFrom.fromState
    }
}

/**
 * 发送消息
 * @param message 
 * @param messageContentType 
 * @param app 
 */
export function sendMessage(message: string,messageContentType = 'text',app) {
    if(message.length === 0) {
        showMessage(app,'warning','您还没有输入任何内容哦!');
        return;
    }
    const {
        socket,
        userBasicMes: {user_id: userId},
        focusTargetId,
        dialogList
    } = app.$store.state;
    let messageType;
    dialogList.forEach(dialog => {
        if(dialog.dialogTargetId === focusTargetId) {
            if(dialog.dialogTargetType === 'group') messageType = 1;
            else messageType = 0;
        }
    })    
    if(socket.connected) {
        socket.emit("message", {
        message_from_id: userId,
        message_to_id: focusTargetId,
        message_type: messageType,
        message_content: message,
        message_content_type: messageContentType
        }, message => {
            addUserSendedMessage(message.data.chatingMessageMes)
            if(messageType === 0) {
                updateDialogList(message.data.chatingMessageMes,true);
            }
            else updateDialogList(message.data.chatingMessageMes);
            store.commit('changeScrollDown',true);
            if(app.inputMessage) {
                app.inputMessage = '';
            }
        })
        // 发送消息失败时的处理
        socket.once('messageException', err => {
            const {message} = err;
            showMessage(app,'warning',message,3000,true);
        })
    }
    else {
        //
    }
}