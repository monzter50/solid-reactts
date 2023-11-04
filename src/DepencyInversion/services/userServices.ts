import {get} from "../utils/settings.ts";

export interface User {
    name?:string;
    email?:string;
    username?:string;
}
export interface ResponseUser{
    data?:User[]

}
function getUserServices(): Promise<ResponseUser>{
    return get({
        defaultErr:"We have error when get user",
        endpoint:"/users"
    })
}

export {
    getUserServices
}