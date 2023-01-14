import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { CommonService } from 'src/app/services/common.service';
import { Theme } from 'src/app/services/Util';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent implements OnInit {
  readonly theme = Theme;
  @Input() sm!: Skill;
  @ViewChild('curLogoImg') curLogoImg: ElementRef | undefined;
  constructor(public cm: CommonService) {}

  ngOnInit(): void {
    console.log(this.curLogoImg?.nativeElement.getBoundingClientRect());
  }
}
