import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import mutations from './mutations'

Vue.use(Vuex)

const dialogList: Array<any> = [];

const state = {
  loginState: false,
  userBasicMes: null,
  dialogList,
  guestDefaultGroup: null,
  // 聚焦状态下的dialog
  focusTargetId: '',
  messageMap: {},
  // socket实例
  socket: null,
  scrollDown: true,
  notification: false,
  imageLoading: false,
  // 侧边栏的选择（包括消息列表，联系人列表，初始为dialogList）
  sidebarChosen: 'dialogList',
  // 选中的联系人信息
  focusLinkman: {},
  // 所有群组的所有成员信息（以群组ID为属性，以成员信息为属性值）
  allGroupMembers: {},
  // 所有好友的信息
  friendsMes: []
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
