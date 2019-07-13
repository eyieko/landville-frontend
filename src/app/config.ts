import {environment} from '../environments/environment';

function appConfig() {

  return {
<<<<<<< HEAD
    base_url: environment.api_url,
=======
    base_url: 'https://landville-backend-web-api.herokuapp.com/api/v1/',
    facebookId: '1782833315349267',
    googleId:
      '315082406739-imasn7gsabthac3uaer84oqmp1g2780p.apps.googleusercontent.com'
>>>>>>> 167123375-ft(authentication):Users be able to login via social auth
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
