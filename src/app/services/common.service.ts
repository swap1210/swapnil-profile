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
  public frameworks$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(
    []
  );
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
    if (environment.production) {
      let self = this;
      this.afs
        .doc<any>(`common/basic-info`)
        .get()
        .subscribe({
          next: (val) => {
            console.log('comm basic', JSON.stringify(val.data()));
            const { skills, experiences, frameworks } = val.data();
            // self.header$.next(val.data().header);
            // self.body$.next(val.data().body);
            this.skills$.next(skills as Skill[]);
            this.frameworks$.next(frameworks as Skill[]);
            this.experiences$.next(experiences as Experience[]);
          },
          complete: () => {
            console.log('Done looking for common data');
          },
        });
    } else {
      this.skills$.next(this.skillsObj);
      this.experiences$.next(this.experiencesObj);
      this.frameworks$.next(this.frameworkObj);
    }
  };

  readonly skillsObj: Skill[] = [
    {
      period: '2020 - Present',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fgo-logo-blue.svg?alt=media&token=c45c5a78-0a7c-43d3-8f95-54d98f9cf7c1',
      title: 'Golang',
      sequence: 1,
    },
    {
      period: '2011 - Present',
      sequence: 3,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fjava.svg?alt=media&token=2012223f-7a8c-46f4-905a-588696269f9f',
      title: 'Java',
    },
    {
      title: 'Typescript',
      sequence: 4,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fts-logo-256.svg?alt=media&token=66980c03-e8a9-4187-89fc-d517aaf3a473',
    },
    {
      title: 'JavaScript',
      sequence: 5,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2FUnofficial_JavaScript_logo_2.svg?alt=media&token=9a507834-828a-4467-98a6-1899d07e4de1',
    },
    {
      title: 'PL/SQL',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2FAppDev_plsql_detailed.svg?alt=media&token=ae6121d9-1622-46e1-a45b-eedbecd0897c',
      sequence: 6,
    },
    {
      sequence: 7,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Flogo_dart_192px.svg?alt=media&token=4b4fac3d-ac79-4477-b9d1-2105a2c041e1',
      title: 'Dart',
    },
    {
      sequence: 10,
      title: 'Node.js',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2FNode.js_logo.svg?alt=media&token=9ed00a7c-098a-48c6-87de-fa77f187a142',
    },
    {
      sequence: 9,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fswift-64x64.png?alt=media&token=256f3c21-4f06-4614-acd3-0b3011c482dc',
      title: 'Swift',
    },
  ];

  readonly frameworkObj: Skill[] = [
    {
      period: '2019 - Present',
      sequence: 0,
      title: 'Angular',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fangular.svg?alt=media&token=15cb0b47-2778-4e5c-be3b-94279585dc95',
    },
    {
      period: '2019 - Present',
      sequence: 1,
      title: 'ExpressJS',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fangular.svg?alt=media&token=15cb0b47-2778-4e5c-be3b-94279585dc95',
    },
    {
      period: '2019 - Present',
      sequence: 2,
      title: 'Flutter',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fangular.svg?alt=media&token=15cb0b47-2778-4e5c-be3b-94279585dc95',
    },
    {
      period: '2015 - Present',
      sequence: 3,
      title: 'Android',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fangular.svg?alt=media&token=15cb0b47-2778-4e5c-be3b-94279585dc95',
    },
  ];
  readonly experiencesObj: Experience[] = [
    {
      organization: 'Deloitte',
      period: 'March 2020 – August 2021',
      sequence: 0,
      title: 'Consultant at Deloitte USI, Bangalore India',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2FDeloitteNewSmall.png?alt=media&token=47132bc8-b695-4edb-9b6e-2a90cfd1faae',
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
      title: 'Accenture Solutions Private Limited',
      tasks: [
        'Developed 12 conversion, reports, and extension components for the fluent transition of clients while ensuring data quality and consistency.',
        'Developed lightweight REST APIs using Node.js to securely sync end-of-business records from 3rd party vendors to Oracle 11g with reporting.',
        'Automated XLIF translation and deployment by maintaining a global dictionary and reducing rework by up to 30% for Oracle BI reports.',
        'Developed Angular web app for dashboards and reports for 24x7 monitoring system resource status with email triggers audited manually.',
        'Provided excellent customer service during support roles to pen down client requirements into the service tool during the planning phase.',
        'Helped transitioned the deployment from agile to CI/CD by switching from Jenkins to GitHub workflow completed with testing sequence.',
      ],
      organization: 'Accenture',
      period: 'September 2016 - March 2020',
      sequence: 1,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Faccenture.jpeg?alt=media&token=b59040e6-7cf2-45b5-9edc-1337ed5f2313',
    },
    {
      tasks: [
        'Helped to improve grades of students by up to 30% by conducting extra classes and labs with an additional focus on low-performing students.',
        'Curated quizzes and assignments as per the latest programming trends to enhance the existing syllabus with the help of Professors.',
        'Managed multiple classes under different Professors and assessed all the assignments with high accuracy within deadlines and grade reporting.',
        'Responsible for grading final projects of graduate students, including design document review, presentations, live demos, and code assessment.',
      ],
      sequence: 2,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fuhcl-acronym-4-color.png?alt=media&token=7d57eaa6-7349-4a32-b0a7-0d9af92597d4',
      title: 'Teaching Assistant at University of Houston at Clearlake',
      organization: 'UHCL',
    },
    {
      tasks: [
        'Provided excellent customer service, support, and general information to students, parents, faculty, staff, and visitors, virtually and in person.',
        'Provided referrals to university support services and community resources.',
        'Created and facilitate special projects, in-person and virtual advocacy marketing campaigns, events, training, and workshops.',
        'Created social media content and manage digital content across multiple platforms (web, database, social media, email, etc.).',
        'Assisted in the general management and duties of Advocacy Programs (Emergency Assistance Resources, Food Access Programs/Distributions, Former Foster Youth Support Services, etc. ).',
        'Analysed data and produce reports. Clerical and front desk duties.',
      ],
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2Fuhcl-acronym-4-color.png?alt=media&token=7d57eaa6-7349-4a32-b0a7-0d9af92597d4',
      sequence: 3,
      title: 'Student Tech II at University of Houston at Clearlake',
      organization: 'UHCL',
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
