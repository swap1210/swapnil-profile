import { Component, Input, OnInit } from '@angular/core';
import { FooterModel } from 'src/app/models/footer';

@Component({
  selector: 'app-footer-card',
  templateUrl: './footer-card.component.html',
  styleUrls: ['./footer-card.component.scss'],
})
export class FooterCardComponent implements OnInit {
  @Input()
  footerData!: FooterModel;
  constructor() {}

  ngOnInit(): void {}
}
