interface Params {
    [key: string]: string | number | boolean; // or whatever types you expect
}
interface IBaseConfigParams{
    method:'GET'|'POST' |'PUT'|'DELETE';
    endpoint?:string;
    params?:Params,
    baseUrl:string;
    args?:{
        url: RequestInfo | URL ;
    };
}

export default function RequestFactory({
          method = 'GET',
          endpoint = '',
          params = { limit: 10, offset: 0 },
               baseUrl,
          args
      }: IBaseConfigParams) {
    // Opciones por defecto estan marcadas con un *
    const query = Object.keys(params)?.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(String(params[k])))
        .join('&');
    const replace = args?.url !== undefined;
    const uri = replace ? args?.url : `${baseUrl}${endpoint}?${query}`;
    return fetch(uri, {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        ...args,
    });
    // parses JSON response into native JavaScript objects
}