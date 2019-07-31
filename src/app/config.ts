import {environment} from '../environments/environment';

function appConfig() {

  return {
    base_url: environment.api_url,
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
