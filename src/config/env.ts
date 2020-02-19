let baseUrl: string = '';
let nameSpace: string = 'websocket';

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://localhost:3000/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://47.106.13.104:3000/';
}

const socketUrl: string = baseUrl + nameSpace;

export {baseUrl,socketUrl};