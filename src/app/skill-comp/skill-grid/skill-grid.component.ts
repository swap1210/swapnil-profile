import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-skill-grid',
  templateUrl: './skill-grid.component.html',
  styleUrls: ['./skill-grid.component.scss'],
})
export class SkillGridComponent implements OnInit {
  constructor(public cs: CommonService) {}

  ngOnInit(): void {}
}
