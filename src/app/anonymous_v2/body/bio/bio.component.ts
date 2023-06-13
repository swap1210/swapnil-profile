import { Component, Input, OnInit } from '@angular/core';
import { AboutMe } from 'src/app/models/aboutme';
import { AllSkills } from 'src/app/models/allSkills';
import { Header } from 'src/app/models/header';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent implements OnInit {
  @Input()
  darkMode!: boolean;
  @Input() header!: Header;
  @Input() allSkills!: AllSkills;
  public skillsStr: String = '';
  constructor() {}

  ngOnInit(): void {
    // this.skillsStr = ;
  }

  public transformFunc = (v: Skill) => {
    return v.title;
  };
}
