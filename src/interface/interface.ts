export interface From {
    fromId: string;
    fromName: string;
    fromAvatar: string;
    fromState: number;
}

export interface Target {
    targetId: string;
    targetName: string;
    targetAvatar: string;
    targetState: number;
}

/**
 * 聊天消息interface
 */
export interface Message {
    messageId: number;
    messageFromMes: From;
    messageTargetMes: Target;
    messageType: number;
    messageContent: string;
    messageContentType: string;
    messageCreatedTime: string;
}

export interface MessageMap {
    [dialogTargetId: string]: {
        dialogId: number;
        messages: Array<Message>
    }
}