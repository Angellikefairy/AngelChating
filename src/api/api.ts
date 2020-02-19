import {fetch} from "../config/fetch"

/**
 * 注册
 * @param userName 
 * @param password 
 */
export const register = (userName: string,password: string) => fetch('post','register',{
    userName,
    password
})

/**
 * 通过账密进行登录
 * @param userName 
 * @param password 
 */
export const login = (userName: string,password: string) => fetch('post', 'login',{
    userName,
    password
})

/**
 * 通过浏览器缓存的Token进行登录
 * @param accessToken 
 */
export const loginByToken = (accessToken: string) => fetch('post','login',{
    accessToken
})

/**
 * 通过用户ID进行登出
 * @param userId 
 */
export const logout = (userId: string) => fetch('post','logout', {
    userId
})

/**
 * 获取对话列表
 * @param userId 
 * @param page 
 * @param limit 
 */
export const getDialog = (
    userId: string, 
    page: number, 
    limit: number
) => fetch('get','dialog-list',{
    userId,
    page,
    limit
})

/**
 * 用户通过dialogID来获取该对话的历史消息
 * @param dialogId 
 * @param page 
 * @param limit 
 */
export const getHistoryMessages = (
    dialogId: number,
    page: number,
    limit: number
) => fetch('get','message/history', {
    dialogId,
    page,
    limit
})
/**
 * 获取默认群组的历史消息
 * @param page 
 * @param limit 
 */
export const getGuestHistoryMessages = (
    page: number,
    limit: number
) => fetch('get','message/history/guest',{
    page,
    limit
})

/**
 * 获取dialog信息
 * @param dialogFromId 
 * @param dialogTargetId 
 */
export const getDialogMes = (
    dialogFromId: string,
    dialogTargetId: string
) => fetch('get','dialog',{
    dialogFromId,
    dialogTargetId
})

/**
 * 获取用户的偏好设置信息
 * @param userId 
 */
export const getPreferSetting = (
    userId: string
) => fetch('get', 'user-setting/prefer-setting', {
    userId
})

/**
 * 修改偏好设置信息
 * @param userId 
 * @param newSetting 
 */
export const modifyPreferSetting = (
    userId: string,
    newSetting: any
) => fetch('patch', 'user-setting/prefer-setting', {
    userId,
    newSetting
})

/**
 * 获取好友列表
 * @param userId 
 */
export const getFriendsList = (
    userId: string
) => fetch('get', 'friendsList', {
    userId
})

/**
 * 获取用户的群组列表
 * @param userId 
 */
export const getGroupList = (
    userId: string
) => fetch('get', 'groupList', {
    userId
})

/**
 * 获取群组的所有成员信息
 * @param groupId 
 */
export const getGroupMembers = (
    groupId: string
) => fetch('get', 'groupMembers', {
    groupId
})
