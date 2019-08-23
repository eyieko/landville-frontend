import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
const token = localStorage.getItem('token');

export const decodedToken = () => {
    const tokens =  helper.decodeToken(token);
    return tokens.id;
};
