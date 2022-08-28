import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Role } from '../models/role';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	Role = Role;
	constructor(public auth: AuthService) {}
	ngOnInit() {}
}
