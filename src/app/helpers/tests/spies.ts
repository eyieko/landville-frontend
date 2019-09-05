export const resetSpies = (spies: any[]) => {
  spies.forEach(spyObj => {
    Object.keys(spyObj).forEach(prop => {
      if (typeof spyObj[prop] === 'function') {
        spyObj[prop].calls.reset();
      }
    });
  });
};
const createSpyObj = (name: string, methods: string[]) => {
  return jasmine.createSpyObj(name, methods);
};

export const loginServiceSpy = createSpyObj('LoginService', ['login']);

export const toastServiceSpy = createSpyObj('ToastrService', [
  'success',
  'error',
  'info',
  'warning'
]);

export const profileServiceSpy = createSpyObj('ProfileService', [
  'getProfile',
  'updateProfile',
  'pushProfile',
  'getDeposits'
]);

export const registerServiceSpy = createSpyObj('RegisterServiceService', [
  'registerUser'
]);

export const routerSpy = jasmine.createSpyObj('Router', [
  'navigateByUrl',
  'navigate'
]);

export const localStorageSpy = createSpyObj('LocalStorage', [
  'get',
  'set',
  'clear'
]);

export const companyServiceSpy = createSpyObj('CompanyService', [
  'createCompany',
  'getCompanyDetails'
]);

export const httpRequestSpy = jasmine.createSpyObj('HttpRequest', [
  'doesNotMatter',
  'clone'
]);

export const resetLinkServiceSpy = createSpyObj('PasswordResetService', [
  'getResetLink'
]);

export const resetPassordService = createSpyObj('EnterResetPasswordService', [
  'changePassword'
]);

export const propertiesServiceSpy = createSpyObj('PropertiesService', [
  'getProperties'
]);

export const propertyDetailSpy = jasmine.createSpyObj('PropertyDetailService', [
  'getProperty'
]);
export const activatedRoutespy = jasmine.createSpyObj('ActivatedRoute', [
  'snapshot',
  'paramMap'
]);

export const DepositsSpy = createSpyObj('DepositsService', ['getDeposits']);

export const clientsServiceSpy = createSpyObj('ClientsService', [
  'fetchClientCompanies'
]);
export const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

export const httpClientSpy = jasmine.createSpyObj('HttpClient', [
  'post',
  'get',
  'put',
  'delete',
  'request'
]);

export const httpServiceSpy = jasmine.createSpyObj('HttpService', [
  'makeRequestWithData',
  'getRequestWithParams'
]);
