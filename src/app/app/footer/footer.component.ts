import { Component, OnInit } from '@angular/core';
import { FooterModel } from 'src/app/models/footer';
import { CommonService } from 'src/app/services/common.service';
import { Util } from 'src/app/services/Util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public cs: CommonService) {}

  ngOnInit(): void {}
}
