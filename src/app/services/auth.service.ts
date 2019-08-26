import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() { }

	isLoggedIn(): boolean {
		const helper = new JwtHelperService();
		const token = localStorage.getItem('token');
		let decodedToken = null;
		try {
			decodedToken = helper.decodeToken(token);
		} catch (error) {
			return false;
		}
		return decodedToken && !helper.isTokenExpired(token);
	}
}
