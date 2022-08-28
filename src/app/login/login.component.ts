import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	Role = Role;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit() {}

	login() {
		this.authService.googleSignin();
	}

	logout() {
		this.authService.logout();
	}
}
