import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ImpDialogComponent } from './imp-dialog/imp-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode = false;
  constructor(private comm: CommonService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.comm.darkThemeState$.subscribe({
      next: (val: boolean) => {
        this.darkMode = val;
      },
    });
    let self = this;
    this.comm.body$.subscribe({
      next: (imp) => {
        console.log('imp', imp.important);

        if (!self.dialog || !imp.important) {
          return;
        }

        //dont open dialog untile valid data is received
        const dialogRef = self.dialog.open(ImpDialogComponent, {
          width: '250px',
          data: imp.important,
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed', result);
        });
      },
    });
  }
}
