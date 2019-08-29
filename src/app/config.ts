import { environment } from '../environments/environment';

function appConfig() {
  return {
    base_url: environment.api_url,
    visa_card_url: environment.visa_card_url,
    master_card_url: environment.master_card_url,
    american_express_card: environment.american_express_card,
    paypal_card: environment.paypal_card,
    facebookId: '1782833315349267',
    googleId:
      '315082406739-imasn7gsabthac3uaer84oqmp1g2780p.apps.googleusercontent.com'
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
