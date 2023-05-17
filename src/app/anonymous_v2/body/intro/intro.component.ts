import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('linkedinLogo')
  linkedinLogo!: ElementRef;
  @ViewChild('githubLogo')
  githubLogo!: ElementRef;
  constructor(private renderer2: Renderer2, public commData: CommonService) {}

  ngOnInit(): void {
    this.commData.header$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userObj_in_header) => {
        if (Object.keys(userObj_in_header).length != 0) {
          this.renderer2.setAttribute(
            this.linkedinLogo.nativeElement,
            'd',
            userObj_in_header.linkedin.logo
          );
          this.renderer2.setAttribute(
            this.githubLogo.nativeElement,
            'd',
            userObj_in_header.github.logo
          );
        }
      });
  }
}
