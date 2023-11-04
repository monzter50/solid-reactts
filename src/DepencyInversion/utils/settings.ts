/* eslint-disable @typescript-eslint/no-explicit-any */

import RequestFactory from "./RequestFactory.ts";
interface Request{
    endpoint:string;
    defaultErr?:string
}

export function get({
                endpoint,
                defaultErr = "We have a error"
            }:Request):Promise<any>{
    return new Promise(function (resolve, reject) {
        RequestFactory({
            method: 'GET',
            endpoint: endpoint,
            baseUrl:"https://jsonplaceholder.typicode.com"
        })
            .then(response => {
                if (response.status !== 200) {
                    return reject({ defaultErr, status: response.status });
                }
                return response.json();
            })
            .then(result => {
                let response = result;
                if (response.data) {
                    response = response.data;
                }
                resolve({ data: response, count: result?.count || 0 });
            })
            .catch(error => {
                return reject(error.response);
            })
            .finally(() => {});
    });
}
