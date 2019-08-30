<<<<<<< HEAD
import { environment } from '../environments/environment';
import { image_urls } from 'src/assets/img/image_urls'
=======
import { environment } from 'src/environments/environment';
>>>>>>> Refactor Un necessary files and fix Routing problem

function appConfig() {
  return {
    base_url: environment.api_url,
    visa_card_url: image_urls.visa_card_url,
    master_card_url: image_urls.master_card_url,
    american_express_card: image_urls.american_express_card,
    paypal_card: image_urls.paypal_card,
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
