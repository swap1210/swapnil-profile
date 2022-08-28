import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	CanLoad,
	Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Role } from './models/role';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private router: Router, private authService: AuthService) {}

	async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const user = await this.authService.getUser();
		// console.log('user', user);
		const loggedIn = !!user;
		if (!loggedIn) {
			this.router.navigate(['login']);
			return false;
		}
		return loggedIn;
	}

	canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService
			.getUser()
			.then((v) => {
				const roles = route.data && (route.data['roles'] as Role[]);
				if (v && roles) {
					return roles.includes(v.role || Role.Visitor);
				} else {
					return false;
				}
			})
			.catch(() => {
				return false;
			});
	}
}
