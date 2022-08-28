import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footer_data = Util.footer;
  constructor() {}

  ngOnInit(): void {}
}
