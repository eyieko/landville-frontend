import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

class MockRouter {
	navigate(path) {}
}

describe('AuthGuard', () => {
	let MockAuthService;
	let router;
	let guard;
	beforeEach(() => {
		MockAuthService = jasmine.createSpyObj([ 'isLoggedIn' ]);
		router = new MockRouter();
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule ],
			providers: [ { provide: { AuthService, useValue: MockAuthService } }, AuthGuard ]
		});
		guard = new AuthGuard(MockAuthService, router);
	});

	it(
		'should setup the guard correctly',
		inject([ AuthGuard ], (guard: AuthGuard) => {
			expect(guard).toBeTruthy();
		})
	);

	it('should activate', () => {
		const next = {
			url: '/'
		};
		const state = null;
		MockAuthService.isLoggedIn.and.returnValue(true);
		expect(guard.canActivate(next, state)).toBeTruthy();
	});

	it('should not activate', () => {
		const next = {
			url: '/'
		};
		const state = null;
		MockAuthService.isLoggedIn.and.returnValue(false);
		expect(guard.canActivate(next, state)).toBeFalsy();
	});
});
