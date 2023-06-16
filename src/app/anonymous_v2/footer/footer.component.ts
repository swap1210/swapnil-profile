import { Component, Input, OnInit } from '@angular/core';
import { FooterModel } from 'src/app/models/footer';
import { Header } from 'src/app/models/header';
import { CommonService } from 'src/app/services/common.service';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input()
  header!: Header;
  @Input()
  footer!: FooterModel[];
  @Input()
  darkMode!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
