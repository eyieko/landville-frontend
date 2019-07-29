function appConfig () {
   
    return {
        base_url: 'http://127.0.0.1:8000/api/v1/'
    };
}

export enum HttpMethods {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete',
  }

export const APPCONFIG = appConfig()
