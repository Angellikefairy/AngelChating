import {baseUrl} from './env'
import axios from 'axios'

export const fetch = async function(method: string,api: string,data: any) {
    const url: string = baseUrl + api;
    if(method === 'get') {
        try {
            return (await axios.get(url,{
                params: data
            })).data;
        } catch(err) {
            return err.response.data;
        }
    }
    else if(method === 'post' || method === 'patch'){
        try {
            return (await axios[method](url,data)).data;
        } catch(err) {
            return err.response.data;
        }
    }
}