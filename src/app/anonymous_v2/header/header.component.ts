import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Header } from 'src/app/models/header';
import { Notification } from 'src/app/models/notification';
import { CommonService } from 'src/app/services/common.service';
import { Util } from 'src/app/services/Util';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  util = Util;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAuthorized = false;
  isUser = false;
  isAdmin = false;
  header: Header = {
    appIconLink: '',
    appName: '',
    appDesc: [],
    linkedin: { link: '', logo: '' },
    github: { link: '', logo: '' },
  };
  notifications: Notification[] = [];
  // themeVal = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public commData: CommonService
  ) {}

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userObj_in_header) => {
        if (userObj_in_header && Object.keys(userObj_in_header).length != 0) {
          this.isAuthorized = userObj_in_header?.role >= Role.Visitor;
          this.isUser = userObj_in_header?.role == Role.User;
          this.isAdmin = userObj_in_header?.role == Role.Admin;
        } else {
          this.isAuthorized = false;
          this.isUser = false;
          this.isAdmin = false;
        }
      });

    this.commData.body$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userObj_in_body) => {
        if (userObj_in_body.notification) {
          this.notifications = userObj_in_body.notification;
        }
      });

    // this.commData.darkThemeState$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((currentThemeVal) => {
    //     this.themeVal = currentThemeVal;
    //   });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  //prefer active unsubscribing from all the hotpatch data from firebase
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  switchTheme = (): void => {
    //send new value to app component
    this.commData.darkThemeState$.next(
      !this.commData.darkThemeState$.getValue()
    );
  };
}
