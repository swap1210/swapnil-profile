import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent implements OnInit {
  @Input() sm!: Skill;
  @ViewChild('curLogoImg') curLogoImg: ElementRef | undefined;
  constructor() {}

  ngOnInit(): void {
    console.log(this.curLogoImg?.nativeElement.getBoundingClientRect());
  }
}
