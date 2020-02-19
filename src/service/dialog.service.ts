import {
    getDialog,
    getDialogMes
} from "../api/api"

import store from "../store/index"
import { Socket } from 'socket.io';

/**
 * 获取对话列表（分页）
 * @param userId 
 * @param page 
 * @param limit 
 */
export async function getDialogList(userId: string,page: number = 1,limit: number = 20) {
    const dialogMes = await getDialog(userId,page,limit);
    if(dialogMes.data) {
        let {dialogList,curPage,listNum,pageSum} = dialogMes.data;
        dialogList = dialogList.map(dialog => {
            const {
                targetType: dialogTargetType,
                targetId: dialogTargetId,
                targetName: dialogTargetName,
                targetAvatar: avatar,
                targetState: dialogState
            } = dialog.dialogTarget;
            const {messageContent,messageCreatedTime,messageFromName,messageContentType} = dialog.lastMessage;
            return {
                dialogId: dialog.dialogId,
                dialogTargetType,
                dialogTargetId,
                dialogTargetName,
                avatar,
                dialogState,
                lastMessage: {
                    message_content: messageContent,
                    message_created_time: messageCreatedTime,
                    message_from_name: messageFromName,
                    message_content_type: messageContentType
                },
                newMesNum: 0
            }
        })
        store.commit('initDialogList', dialogList);
    }
}
/**
 * 更新对话列表
 * @param message 
 */
export async function updateDialogList(message: any,isSelf: boolean = false) {
    const {
        messageFromUser,
        messageTarget,
        messageContent,
        messageContentType,
        messageType,
        messageCreatedTime
    } = message;
    let avatar,dialogTargetId,dialogTargetName,dialogState,dialogTargetType;
    if(messageType === 0) {
        avatar = messageFromUser.messageFromAvatar;
        dialogTargetId = messageFromUser.messageFromId;
        dialogTargetName = messageFromUser.messageFromName;
        dialogTargetType = 'user';
        dialogState = messageFromUser.messageFromState;
    }
    if(messageType === 1 || (messageType === 0 && isSelf)) {
        avatar = messageTarget.messageToAvatar;
        dialogTargetId = messageTarget.messageToId;
        dialogTargetName = messageTarget.messageToName;
        dialogTargetType = isSelf ? 'user' : 'group';
        dialogState = messageTarget.messageToState;
    }
    const dialogList = store.state.dialogList;
    let newMesNum: number = 0;
    for(let dialog of dialogList) {
        if(dialog.dialogTargetId === dialogTargetId) {
            if(dialog.newMesNum !== undefined) {
                newMesNum = dialog.newMesNum + 1;
            }
            else newMesNum = 1;
        }
    }
    const dialogId = await getDialogId(dialogTargetId);
    store.commit('updateDialogMes', {
        dialogId,
        avatar,
        dialogTargetId,
        dialogTargetName,
        dialogTargetType,
        dialogState,
        lastMessage: {
            message_content: messageContent,
            message_created_time: messageCreatedTime,
            message_from_name: messageFromUser.messageFromName,
            message_content_type: messageContentType
        },
        newMesNum
    })
}

/**
 * 重置对话列表
 */
export function resetDialogList() {
    store.commit('resetDialogList');
}

/**
 * 获取dialogId
 * @param dialogTargetId 
 */
export async function getDialogId(dialogTargetId) {
    if(store.state.loginState) {
        const userId = (store.state.userBasicMes as any).user_id;
        const dialogMes = (await getDialogMes(userId,dialogTargetId));
        if(dialogMes.data) {
            return dialogMes.data.dialogMes.dialog_id;
        }
    }
    else return undefined;
}