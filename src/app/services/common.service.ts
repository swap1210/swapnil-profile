//service to fetch some common details from server to once login/anonymous login is complete

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, scan, startWith, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FooterModel } from '../models/footer';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public header$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public body$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public footer$: BehaviorSubject<any> = new BehaviorSubject<FooterModel[]>([]);
  public skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);

  public darkThemeState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private auth: AuthService
  ) {
    //refresh data everytime the user status changes
    this.auth.user$.subscribe({
      next: (ur) => {
        if (ur) {
          this.initBasicInfo();
        }
      },
    });

    console.log('CommonService Constructor completed');
  }

  initBasicInfo = () => {
    this.header$.next(this.basicInfoObj.header);
    this.footer$.next(this.basicInfoObj.footer);
    let self = this;
    this.afs
      .doc<any>(`common/basic-info`)
      .get()
      .subscribe({
        next: (val) => {
          console.log('comm basic', val.data());
          // self.header$.next(val.data().header);
          // self.body$.next(val.data().body);
          this.skills$.next(val.data().skills as Skill[]);
        },
        complete: () => {
          console.log('Done looking for common data');
        },
      });
  };

  skillsObj: Skill[] = [
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fgopher.svg?alt=media&token=7b546ab4-4bd0-4b8b-9c83-38e930889b65',
      proficiency: 80,
      title: 'Golang',
      period: '2020 - Present',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fangular.svg?alt=media&token=87dd488f-ebdc-4a49-8503-88615e38ce60',
      proficiency: 85,
      title: 'Angular',
      period: '2017 - Present',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fjava.svg?alt=media&token=bea46269-6317-4f6c-bc32-d54fe5de7a3f',
      proficiency: 90,
      title: 'Java',
      period: '2011 - Present',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fjava.svg?alt=media&token=bea46269-6317-4f6c-bc32-d54fe5de7a3f',
      proficiency: 90,
      title: 'Java',
      period: '2011 - Present',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fjava.svg?alt=media&token=bea46269-6317-4f6c-bc32-d54fe5de7a3f',
      proficiency: 90,
      title: 'Java',
      period: '2011 - Present',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fjava.svg?alt=media&token=bea46269-6317-4f6c-bc32-d54fe5de7a3f',
      proficiency: 90,
      title: 'Java',
      period: '2011 - Present',
    },
  ];

  basicInfoObj = {
    header: {
      appIconLink: 'https://avatars.githubusercontent.com/u/16183749?v=4',
      appName: 'Swapnil Patel',
      authorName: 'Swapnil Patel',
      github: {
        logo: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
        link: 'https://github.com/swap1210',
      },
      appDesc: '[ Full Stack Developer | Software Architect ]',
      linkedin: {
        logo: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
        link: 'https://www.linkedin.com/in/swap1210/',
      },
    },
    body: {
      notification: [
        {
          message: 'Hi this just happened too',
          title: 'News2',
          date: {
            seconds: 1660688466,
            nanoseconds: 539000000,
          },
        },
        {
          title: 'News1',
          date: {
            seconds: 1660691777,
            nanoseconds: 445000000,
          },
          message: 'Hi this just happened',
        },
        {
          title: 'Hi',
          message: 'Hello there',
        },
      ],
      welcome: {
        title: 'Hello there!',
        message:
          "Here you can type in some welcome message to give an initial impression about the site for first times. This won't be displayed the second time.",
      },
      important: {
        title: 'Caution:',
        underConstruction: true,
        message: 'This site is under construction. Expect bugs.',
      },
    },
    footer: [
      // {
      //   icon: 'https://avatars.githubusercontent.com/u/16183749?v=4',
      //   title: 'Terms and Condition',
      //   link: 'tnc',
      // },
      // {
      //   icon: 'phone',
      //   title: 'Contact',
      //   link: 'mail',
      // },
      {
        link: 'about-us',
        title: 'Developed by <u>Swapnil Patel</u> 🙂',
        icon: 'face',
      },
    ],
  };
}
