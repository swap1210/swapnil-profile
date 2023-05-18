import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Header } from 'src/app/models/header';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-find-me',
  templateUrl: './find-me.component.html',
  styleUrls: ['./find-me.component.scss'],
})
export class FindMeComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input()
  lr_direction!: boolean;
  @Input()
  header!: Header;
  @Input()
  darkMode!: boolean;

  @ViewChild('linkedinLogo') linkedinLogo!: ElementRef;
  @ViewChild('githubLogo') githubLogo!: ElementRef;

  constructor(private renderer2: Renderer2, private comm: CommonService) {}
  ngAfterViewInit(): void {
    this.comm.header$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: Header) => {
        this.renderer2.setAttribute(
          this.linkedinLogo.nativeElement,
          'd',
          val.linkedin.logo || ''
        );
        this.renderer2.setAttribute(
          this.githubLogo.nativeElement,
          'd',
          val.github.logo || ''
        );
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
