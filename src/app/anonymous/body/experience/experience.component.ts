import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @Input() experiences!: Experience[];
  constructor() {}

  ngOnInit(): void {}
}
