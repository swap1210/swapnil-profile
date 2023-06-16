import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ImpDialogComponent } from './imp-dialog/imp-dialog.component';
import { Header } from './models/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(public comm: CommonService, private dialog: MatDialog) {}
  ngOnInit(): void {
    console.log(
      '%c' + 'Hi, Fellow Developer! 🙋🏽‍♂️',
      'color: #7289DA; -webkit-text-stroke: 2px black; font-size: 32px; font-weight: bold;'
    );
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
