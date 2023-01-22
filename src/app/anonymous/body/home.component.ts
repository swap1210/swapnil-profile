import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Util } from 'src/app/services/Util';
import { Welcome } from 'src/app/models/welcome';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  welcome: Welcome = {
    message: '',
    title: '',
  };
  WelcomeMessageViewed = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  themeDark: boolean = false;

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
    this.comm.darkThemeState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: boolean) => (this.themeDark = val));
    this.comm.body$.pipe(takeUntil(this.destroy$)).subscribe((dat) => {
      if ('welcome' in dat) {
        this.welcome = dat.welcome;
      }
      if (
        !Util.config.disableWelcomeMessage &&
        !this.WelcomeMessageViewed &&
        this.welcome.message
      ) {
        window.alert(this.welcome.message);
        this.WelcomeMessageViewed = true;
      }
    });
  }
}
