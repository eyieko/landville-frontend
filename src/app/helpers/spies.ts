
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

export const  loginServiceSpy = createSpyObj('LoginService', [
    'login'
]);

export const  toastServiceSpy = createSpyObj('ToastrService', [
    'success',
    'error'
]);
export const  registerServiceSpy = createSpyObj('RegisterServiceService', [
    'registerUser'
]);

