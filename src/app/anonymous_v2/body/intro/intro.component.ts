import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Header } from 'src/app/models/header';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit, OnDestroy {
  @Input()
  header!: Header;
  @Input()
  skills!: Skill[];
  @Input()
  darkMode!: boolean;
  shownSkill: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    var skillChanger = setInterval(() => {
      let totalSkills = this.header.appDesc.length;
      if (this.shownSkill == totalSkills - 1) {
        this.shownSkill = 0;
      } else {
        this.shownSkill++;
      }
      this.ref.markForCheck();
    }, 3000);
    this.destroy$.subscribe({
      complete: () => {
        clearInterval(skillChanger);
      },
    });
  }
}
