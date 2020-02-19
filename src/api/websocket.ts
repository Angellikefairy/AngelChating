import {socketUrl} from "../config/env";
import {Socket} from 'socket.io'


const socketPromise = function(eventName,socket: Socket): Promise<any> {
    return new Promise((resolve,reject) => {
        socket.on(eventName,data => {
            resolve(data);
        })
    })
}

export const onConnectMessage = async function(socket: Socket) {
    return await socketPromise('connectMes',socket);
}


