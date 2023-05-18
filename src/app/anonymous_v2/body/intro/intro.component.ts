import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Header } from 'src/app/models/header';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit, OnDestroy {
  @Input()
  header!: Header;
  @Input()
  darkMode!: boolean;
  totalSkills: number = 0;
  shownSkill: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.totalSkills = this.header.appDesc.length;
    var skillChanger = setInterval(() => {
      console.log('Doing ', this.shownSkill);
      if (this.shownSkill == this.totalSkills) {
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
