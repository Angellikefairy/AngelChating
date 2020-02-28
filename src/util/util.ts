import emojis from "vue-emoji-picker/src/emojis"

const emojiMap = Object.assign(Object.create(null),...Object.values(emojis));

interface DatetimeMes<T> {
    year: T;
    month: T;
    date: T;
}

/**
 * 处理时间的表现格式
 * @param time 
 * @param option 
 */
export function resolveTime(time,option) {
    const mesDatetime = new Date(time);
    const {year: curYear, month: curMonth, date: curDate} = getDatetimeMes(new Date());
    const {
        year: mesYear,
        month: mesMonth,
        date: mesDate
    } = getDatetimeMes(mesDatetime);
    if(curYear === mesYear && curMonth === mesMonth && curDate === mesDate) {
        return mesDatetime.toTimeString().slice(0,5);
    }
    else if(curYear === mesYear && curMonth === mesMonth) {
        switch (curDate - mesDate) {
            case 1 : 
                return '昨天' + option; 
            case 2:
                return '前天' + option;
            default: return mesDatetime.toLocaleDateString().slice(5) + option;
        }
    }
    else if(curYear === mesYear){
        return mesDatetime.toLocaleDateString().slice(5) + option;
    }
    else {
        return mesDatetime.toLocaleDateString() + option;
    }
}

/**
 * 获取date信息
 * @param datetime 
 */
export function getDatetimeMes(datetime: Date): DatetimeMes<number> {
    const year = datetime.getFullYear();
    const month = datetime.getMonth();
    const date = datetime.getDate();
    return {
        year,
        // 0表示一年中的第一个月
        month: month+1,
        date
    }
}

/**
 * 使用正则配对消息中的表情
 * @param message 
 * @param messageContent 
 */
export function resolveEmoji(message,messageContent) {
    const matchEmojiItems = message[messageContent].match(/#\{(.*?)\}/g);
    if(matchEmojiItems) {
        for(let matchItem of matchEmojiItems) {
            const emojiName = (matchItem as string).slice(2,-1);
            if(emojiMap[emojiName]) {
                message[messageContent] = (message[messageContent] as string).replace(matchItem,emojiMap[emojiName]);
            }
        }
    }
    return message[messageContent];
}

/**
 * 发出消息提示（封装this.$message({})）
 * @param app 
 * @param type 
 * @param message 
 * @param duration 
 * @param showClose 
 */
export function showMessage(
    app,
    type: 'success'|'warning'|'info'|'error',
    message: string,
    duration: number = 2000,
    showClose: boolean = false,
    onClose?: Function
) {
    app.$message({
        type,
        message,
        duration,
        showClose,
        onClose
    })
}
