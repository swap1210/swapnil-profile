import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-skill-grid',
  templateUrl: './skill-grid.component.html',
  styleUrls: ['./skill-grid.component.scss'],
})
export class SkillGridComponent implements OnInit {
  @Input()
  themeState: boolean | null = false;
  @Input()
  titleLabel!: string;
  @Input()
  skills!: Skill[];
  constructor() {}

  ngOnInit(): void {}
}
