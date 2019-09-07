export const resetSpies = (spies: any[]) => {
  spies.forEach(spyObj => {
    Object.keys(spyObj).forEach(prop => {
      spyObj[prop].calls.reset();
    });
  });
};
const createSpyObj = (name: string, methods: string[]) => {
  return jasmine.createSpyObj(name, methods);
};

export const authServiceSpy = createSpyObj('AuthService', [ 'signIn' ]);

export const loginServiceSpy = createSpyObj('LoginService', [
  'createGoogleUser',
  'createFacebookUser',
  'signOut'
]);
