function appConfig() {
  return {
    base_url: 'https://landville-backend-web-api.herokuapp.com/api/v1/'
  };
}

export enum HttpMethods {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch'
}

export const APPCONFIG = appConfig();
