import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Welcome } from '../models/welcome';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
	welcome: Welcome = {
		message: '',
		title: '',
	};
	WelcomeMessageViewed = false;
	destroy$: Subject<boolean> = new Subject<boolean>();
	constructor(public auth: AuthService, public comm: CommonService) {}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	ngOnInit() {
		// this.auth.anonymousLogin();
		this.auth.user$?.pipe(takeUntil(this.destroy$)).subscribe((usr) => {
			console.log('User ', usr);
			//sign in anonymously if not logged in
			if (!usr) {
				console.log('logging in as anonymous user');
				this.auth.anonymousLogin();
			} else {
				//once logged in start getting property
			}
		});

		this.comm.body$.pipe(takeUntil(this.destroy$)).subscribe((dat) => {
			if ('welcome' in dat) {
				this.welcome = dat.welcome;
			}
			if (!this.WelcomeMessageViewed && this.welcome.message) {
				window.alert(this.welcome.message);
				this.WelcomeMessageViewed = true;
			}
		});
	}
}
