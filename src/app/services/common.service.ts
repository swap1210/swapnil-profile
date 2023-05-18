//service to fetch some common details from server to once login/anonymous login is complete

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FooterModel } from '../models/footer';
import { Skill } from '../models/skill';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experience';
import { Header } from '../models/header';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public header$: BehaviorSubject<Header> = new BehaviorSubject<Header>({
    appIconLink: '',
    appDesc: [''],
    appName: '',
    linkedin: {
      link: '',
      logo: '',
    },
    github: {
      link: '',
      logo: '',
    },
  });
  public body$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public footer$: BehaviorSubject<any> = new BehaviorSubject<FooterModel[]>([]);
  public skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  public frameworks$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(
    []
  );
  public webDevelopments$: BehaviorSubject<Skill[]> = new BehaviorSubject<
    Skill[]
  >([]);
  public databases$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(
    []
  );
  public operatingSystems$: BehaviorSubject<Skill[]> = new BehaviorSubject<
    Skill[]
  >([]);
  public others$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  public tools$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  public applicationServers$: BehaviorSubject<Skill[]> = new BehaviorSubject<
    Skill[]
  >([]);
  public concepts$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);

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
        console.log(ur);
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
            console.log('Data fetch complete');
            const {
              skills,
              experiences,
              frameworks,
              webDevelopments,
              databases,
              concepts,
              applicationServers,
              tools,
              others,
              operatingSystems,
              body,
            } = val.data();
            // self.header$.next(val.data().header);
            // console.log(operatingSystems);
            self.body$.next(body);
            this.skills$.next(skills as Skill[]);
            this.frameworks$.next(frameworks as Skill[]);
            this.webDevelopments$.next(webDevelopments as Skill[]);
            this.databases$.next(databases as Skill[]);
            this.applicationServers$.next(applicationServers as Skill[]);
            this.concepts$.next(concepts as Skill[]);
            this.tools$.next(tools as Skill[]);
            this.others$.next(others as Skill[]);
            this.operatingSystems$.next(operatingSystems as Skill[]);

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
      this.webDevelopments$.next(this.wdObj);
      this.databases$.next(this.dbObj);
      this.applicationServers$.next(this.asObj);
      this.concepts$.next(this.cObj);
      this.tools$.next(this.tObj);
      this.others$.next(this.oObj);
      this.operatingSystems$.next(this.osObj);
    }
  };

  readonly cObj: Skill[] = [
    { sequence: 0, logo: '', title: 'Relational Database' },
    { title: 'Data Structure', sequence: 1, logo: '' },
    { title: 'Object Oriented Programming', sequence: 2, logo: '' },
    { logo: '', title: 'Microservices', sequence: 3 },
    { title: 'MVVM', logo: '', sequence: 4 },
    { sequence: 5, title: 'MVC', logo: '' },
  ];
  readonly tObj: Skill[] = [
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2FVisual_Studio_Code.svg?alt=media&token=e8815585-3c19-44cc-abdc-b4e04407c924',
      title: 'VS Code',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fpostman.svg?alt=media&token=4a97a77d-a4e6-4ff8-bd6a-ab536d5b6a0a',
      title: 'Postman',
    },
    {
      title: 'GitHub',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fgithub.svg?alt=media&token=10702338-e506-4b26-a37a-7ace93187bf4',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fgithub_workflow.png?alt=media&token=9a3c76c3-e76a-4b0e-aaca-7a4a5ac730c1',
      title: 'Workflow',
    },
    {
      title: 'Figma',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2FFigma-logo.svg?alt=media&token=6befe107-e20d-4ee6-961f-b45a87043312',
    },
    {
      title: 'Prettier',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fprettier-logo_small.png?alt=media&token=46f2cc3c-9734-403b-bcdb-f5f3a3e63b91',
    },
    {
      title: 'BI Publisher',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fbip_logo_small.png?alt=media&token=757d26f0-f239-42d6-b096-d1bda22c68a8',
    },
    { title: 'WebADI' },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2Fadf_logo_small.png?alt=media&token=5a887f10-f00f-4db8-a36c-dca62b872b6a',
      title: 'Oracle ADF',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Ftools%2FUIpath.svg?alt=media&token=cb2efe45-0b8b-4238-bc85-055d7b9aa9ce',
      title: 'UiPath',
    },
  ];

  readonly oObj: Skill[] = [
    { logo: '', title: 'GIMP 2.10' },
    { logo: '', title: 'Microsoft Office' },
    { logo: '', title: 'Adobe Photoshop' },
    { logo: '', title: 'Adobe Lightroom' },
    { logo: '', title: 'Photography' },
    { logo: '', title: 'Craft' },
  ];
  readonly osObj: Skill[] = [
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fos-logo%2FIcon-Mac.svg?alt=media&token=98a413c8-383c-4e7f-abb7-3f1b0410105c',
      title: 'MacOS',
      sequence: 0,
    },
    {
      sequence: 1,
      title: 'Windows',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fos-logo%2Fmicrosoft-windows-22.svg?alt=media&token=54cf1663-8b74-4ea9-ae98-629e183b8569',
    },
    {
      sequence: 2,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fos-logo%2Flinux-tux-2-logo-svg-vector.svg?alt=media&token=f26e3d15-2e27-4bca-8a96-25a60e3a99bf',
      title: 'Linux',
    },
    {
      title: 'Android',
      sequence: 3,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Flogos%2FAndroid_logo_2019_(stacked).svg?alt=media&token=9965cd9e-b439-4d1c-8d8d-f49d0543b058',
    },
  ];

  readonly asObj: Skill[] = [
    {
      title: 'Google Firebase',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fserver%2Ffirebase.svg?alt=media&token=0658a939-1d46-4657-950f-b14ef16a016b',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fserver%2Fmicrosoft-azureicon-seeklogo.com.svg?alt=media&token=f0d43e8a-d581-4946-abcf-355141b55b08',
      title: 'Azure',
    },
    {
      title: 'Oracle WebLogic',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fserver%2FOracle%20Weblogic.png?alt=media&token=0b77bcd4-1e40-4ead-96fb-a1af35c32916',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fserver%2FApache_Tomcat_logo.svg?alt=media&token=e755d4c4-20db-4c85-adfc-e29501ddb2d5',
      title: 'Apache Tomcat',
    },
  ];
  readonly dbObj: Skill[] = [
    {
      title: 'Oracle 12c',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Foracle_database_12c_logo.png?alt=media&token=ee44dd42-288f-4edc-a862-42da0281c9d0',
    },
    {
      title: 'Oracle 11g',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Foracle_database_11g_logo.png?alt=media&token=a11dce18-f57c-49de-9ee4-91803d83eab4',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Fmysql.png?alt=media&token=c241d589-a7ec-434b-b74d-0b59474ae4f2',
      title: 'MySQL',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Fnosql%20databases.png?alt=media&token=e53778ae-6c56-4f81-81ef-b5957b4d7342',
      title: 'NoSQL',
    },
    {
      title: 'Firestore',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Ffirestore.svg?alt=media&token=913a5b6f-ed67-4c87-9819-4e5e87fdd012',
    },
    {
      title: 'Realtime Database',
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Ffire_realtime.png?alt=media&token=566d1a24-9d5b-4414-9312-6953e705cd6d',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fdatabase%2Fmongo-svgrepo-com.svg?alt=media&token=d2cf4e4c-3c28-45a4-b782-f22549912b63',
      title: 'MongoDB',
    },
  ];

  readonly wdObj: Skill[] = [
    {
      title: 'HTML/HTML5',
      sequence: 0,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2FHTML-5-logo-vector-01.svg?alt=media&token=9cde891b-eddb-454c-a53d-186547366fd8',
    },
    {
      title: 'CSS2/CSS3',
      sequence: 1,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2FCSS-3-logo-vector-01.svg?alt=media&token=4280dd31-2134-450d-9a32-f37a123a03ec',
    },
    {
      sequence: 2,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2FJSON_vector_logo.svg?alt=media&token=52a70dd3-37ce-4c1f-acc7-999e6f63d5b8',
      title: 'JSON',
    },
    {
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2FAJAX-Language-logo-vector-01.svg?alt=media&token=303bfd6b-7132-4a7b-b283-890f1f5d0edb',
      sequence: 3,
      title: 'AJAX',
    },
    {
      sequence: 4,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2Fangular-material-logo.svg?alt=media&token=44df54d2-5c82-44c7-8153-8e6b506e5b52',
      title: 'Material',
    },
    {
      sequence: 5,
      logo: 'https://firebasestorage.googleapis.com/v0/b/swapnilpatel-projects.appspot.com/o/skills%2Fweb%2FText-xml.svg?alt=media&token=4b81bd0d-7620-484f-9f10-a02283f0e6b9',
      title: 'XML',
    },
  ];

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
      appDesc: ['Full Stack Developer', 'Software Architect', 'Brother'],
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
