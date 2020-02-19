import {historyMessages} from "@/service/message.service";
import * as _ from "lodash";

let noMoreMessage = _.debounce((app)=>{
    app.$message({
        message: '没有更多历史消息了',
        type: 'warning'
    });
},3000,{leading: true})

export default {
    /**
     * 处理messageMap
     * 具体为在messageMap中创建一个以dialogId为键的消息列表
     * @param param0 
     * @param option 
     */
    async resolveMessageMap({commit},option) {
        const {dialogId,dialogTargetId,page,limit,app} = option;
        const messages = await historyMessages(dialogId,page,limit);
        // page大于1确保当一个对话没有任何信息时，不会提示没有更多历史消息了
        if((!messages || messages.length === 0) && page > 1) {
            noMoreMessage(app);
        }
        commit('setMessageMap',{dialogTargetId,dialogId,messages});
    }
}

