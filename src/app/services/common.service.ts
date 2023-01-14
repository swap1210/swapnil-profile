//service to fetch some common details from server to once login/anonymous login is complete

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, scan, startWith, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FooterModel } from '../models/footer';
import { Skill } from '../models/skill';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public header$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public body$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public footer$: BehaviorSubject<any> = new BehaviorSubject<FooterModel[]>([]);
  public skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  public experiences$: BehaviorSubject<Experience[]> = new BehaviorSubject<
    Experience[]
  >([]);

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
    if (true || environment.production) {
      let self = this;
      this.afs
        .doc<any>(`common/basic-info`)
        .get()
        .subscribe({
          next: (val) => {
            console.log('comm basic', JSON.stringify(val.data()));
            const { skills, experiences } = val.data();
            // self.header$.next(val.data().header);
            // self.body$.next(val.data().body);
            this.skills$.next(skills as Skill[]);
            this.experiences$.next(experiences as Experience[]);
          },
          complete: () => {
            console.log('Done looking for common data');
          },
        });
    } else {
      this.skills$.next(this.skillsObj);
      this.experiences$.next(this.experiencesObj);
    }
  };

  readonly skillsObj: Skill[] = [
    {
      title: 'Golang',
      proficiency: 80,
      period: '2020 - Present',
      sequence: 1,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fgopher.svg?alt=media&token=7b546ab4-4bd0-4b8b-9c83-38e930889b65',
    },
    {
      title: 'Angular',
      proficiency: 85,
      sequence: 0,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fangular.svg?alt=media&token=87dd488f-ebdc-4a49-8503-88615e38ce60',
      period: '2019 - Present',
    },
    {
      period: '2011 - Present',
      title: 'Java',
      proficiency: 90,
      sequence: 3,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fjava.svg?alt=media&token=bea46269-6317-4f6c-bc32-d54fe5de7a3f',
    },
    {
      title: 'Typescript',
      proficiency: 75,
      sequence: 4,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fts-logo-256.svg?alt=media&token=d07ed332-8a2e-4858-b316-cbe43474cd5b',
    },
    {
      sequence: 5,
      title: 'JavaScript',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2FUnofficial_JavaScript_logo_2.svg?alt=media&token=01ed2030-1407-4fa6-af92-5eb690b426b9',
      proficiency: 80,
    },
    {
      title: 'PL/SQL',
      sequence: 6,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2FAppDev_plsql_detailed.svg?alt=media&token=4d70f361-c194-4779-9a87-9fabc7be2c87',
      proficiency: 90,
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogo_dart_192px.svg?alt=media&token=a18d5a56-75a9-487e-94e6-c0a47a9d3323',
      proficiency: 75,
      title: 'Dart',
      sequence: 7,
    },
    {
      title: 'Node.js',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2FNode.js_logo.svg?alt=media&token=0c99a016-a250-4dd8-883c-203c371a6704',
      proficiency: 80,
      sequence: 10,
    },
    {
      sequence: 9,
      proficiency: 55,
      title: 'Swift',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fswift-64x64.png?alt=media&token=41fa278f-ff5e-4c8f-ad54-9e81bca8f165',
    },
  ];

  readonly experiencesObj: Experience[] = [
    {
      sequence: 0,
      organization: 'Deloitte',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/DeloitteNewSmall.png',
      title: 'Consultant at Deloitte USI, Bangalore India',
      tasks: [
        'Developed 10 Oracle BI reports and 5 Conversions with fluid requirements within 3 sprints by designing and using reusable templates',
        'Improved performance and turnaround time of known slow conversions by up to 15% using explain plan, Oracle hints, and creating indexes',
        'Developed lite, flexible, and reusable components in Angular and shared them with the team for a consistent and extensible design',
        'Fixed memory leaks and performance tuning-related issues by conducting Load & Stress testing on ExpressJS services using Artillery.',
        'Automate various manual forms of Oracle cloud ERP that lacked web ADI & were dawdling and prone to manual errors by creating UiPath bots',
        'Simultaneously worked on 2 other projects as a full-stack developer and system architect as part of the Firm initiative program by Deloitte.',
        'Worked with the UX team to translate Figma UI templates into repeatable technical solutions by mentoring a frontend team of 3 members.',
        'Rebuilt a 3-year-old internal bot tool in Angular, NgRX and NodeJS with user experience redesign and release it for beta testing within 8 months.',
      ],
    },
    {
      logo: 'https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-1/236971808_10158372672950872_4979305009853044955_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=Gd1niAfmo1YAX9oEW8u&_nc_ht=scontent-hou1-1.xx&oh=00_AfArarlJ-gFzroo5LxZ7Q9tk3uFuAOyTbFhC6CEyrmh7Rw&oe=63C7B3C6',
      organization: 'Accenture',
      sequence: 1,
      title: 'Analyst at Accenture Solutions Private Limited, Bangalore India',
      tasks: [
        'Developed 12 conversion, reports, and extension components for the fluent transition of clients while ensuring data quality and consistency.',
        'Developed lightweight REST APIs using Node.js to securely sync end-of-business records from 3rd party vendors to Oracle 11g with reporting.',
        'Automated XLIF translation and deployment by maintaining a global dictionary and reducing rework by up to 30% for Oracle BI reports.',
        'Developed Angular web app for dashboards and reports for 24x7 monitoring system resource status with email triggers audited manually.',
        'Provided excellent customer service during support roles to pen down client requirements into the service tool during the planning phase.',
        'Helped transitioned the deployment from agile to CI/CD by switching from Jenkins to GitHub workflow completed with testing sequence.',
      ],
    },
    {
      logo: 'https://www.uhcl.edu/marketing-communications/brand-guide/documents/uhcl-acronym-logo/uhcl-acronym-4-color.png',
      organization: 'UHCL',
      sequence: 2,
      title: 'Teaching Assistant at University of Houston at Clearlake',
      tasks: [
        'Helped to improve grades of students by up to 30% by conducting extra classes and labs with a focus on low-performing students',
        'Curated quizzes and assignments as per the latest programming trends to enhance the existing syllabus with the help of Professors.',
        'Handled multiple classes under different professors and assessed all the assignments with high accuracy within deadlines.',
      ],
    },
    {
      logo: 'https://www.uhcl.edu/marketing-communications/brand-guide/documents/uhcl-acronym-logo/uhcl-acronym-4-color.png',
      organization: 'UHCL',
      sequence: 3,
      title: 'Student Tech II at University of Houston at Clearlake',
      tasks: [],
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
