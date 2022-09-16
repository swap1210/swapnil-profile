import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-googly-eye',
  templateUrl: './googly-eye.component.html',
  styleUrls: ['./googly-eye.component.scss'],
})
export class GooglyEyeComponent implements OnInit {
  @ViewChild('leftEye')
  leftEye!: ElementRef;
  @ViewChild('rightEye')
  rightEye!: ElementRef;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  onMouseMove(e: any) {
    const left = this.leftEye.nativeElement.getBoundingClientRect();
    var rad = Math.atan2(e.pageX - left.x, e.pageY - left.y);
    var rot = rad * (180 / Math.PI) * -1 + 270;

    let newStyle = {
      '-webkit-transform': 'rotate(' + rot + 'deg)',
      '-moz-transform': 'rotate(' + rot + 'deg)',
      '-ms-transform': 'rotate(' + rot + 'deg)',
      transform: 'rotate(' + rot + 'deg)',
    };

    Object.keys(newStyle).forEach((v) => {
      this.renderer.setStyle(
        this.leftEye.nativeElement,
        v,
        newStyle[v as keyof typeof newStyle]
      );
      this.renderer.setStyle(
        this.rightEye.nativeElement,
        v,
        newStyle[v as keyof typeof newStyle]
      );
    });
  }
}
