import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode = false;
  constructor(private comm: CommonService) {}
  ngOnInit(): void {
    this.comm.darkThemeState$.subscribe({
      next: (val: boolean) => {
        this.darkMode = val;
      },
    });
  }
}
