import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Header } from 'src/app/models/header';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-find-me',
  templateUrl: './find-me.component.html',
  styleUrls: ['./find-me.component.scss'],
})
export class FindMeComponent implements OnInit, AfterViewChecked {
  @Input()
  lr_direction!: boolean;
  @Input()
  header!: Header;
  @Input()
  darkMode!: boolean;

  @ViewChild('linkedinLogo') linkedinLogo!: ElementRef;
  @ViewChild('githubLogo') githubLogo!: ElementRef;

  constructor(private renderer2: Renderer2) {}

  ngAfterViewChecked(): void {
    this.renderer2.setAttribute(
      this.linkedinLogo.nativeElement,
      'd',
      this.header.linkedin.logo
    );
    this.renderer2.setAttribute(
      this.githubLogo.nativeElement,
      'd',
      this.header.github.logo
    );
  }
  ngOnInit(): void {
    console.log(this.header.linkedin.logo);
  }
}
