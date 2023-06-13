import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subject,
  combineLatest,
  forkJoin,
  mapTo,
  merge,
  takeUntil,
} from 'rxjs';
import { Util } from 'src/app/services/Util';
import { Welcome } from 'src/app/models/welcome';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Header } from 'src/app/models/header';
import { Skill } from 'src/app/models/skill';
import { AboutMe } from 'src/app/models/aboutme';
import { AllSkills } from 'src/app/models/allSkills';

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
  header!: Header;
  allSkills: AllSkills = {
    webdevelopment: [],
    skills: [],
    aboutMe: { title: '', intro: '' },
    frameworks: [],
    databases: [],
    tools: [],
    concepts: [],
  };

  constructor(public auth: AuthService, public comm: CommonService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit() {
    // this.auth.anonymousLogin();
    this.auth.user$?.pipe(takeUntil(this.destroy$)).subscribe((usr) => {
      // console.log('User ', usr);
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
    this.comm.header$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: Header) => (this.header = val));

    combineLatest({
      webdevelopment: this.comm.webDevelopments$,
      skills: this.comm.skills$,
      aboutMe: this.comm.aboutMe$,
      frameworks: this.comm.frameworks$,
      databases: this.comm.databases$,
      tools: this.comm.tools$,
      concepts: this.comm.concepts$,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        console.log(val);
        this.allSkills = val;
      });

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