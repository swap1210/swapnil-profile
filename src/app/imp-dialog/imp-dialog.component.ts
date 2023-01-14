import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImportantDialog } from 'src/app/models/importantDialog';

@Component({
  selector: 'important-dialog',
  templateUrl: 'imp-dialog.component.html',
  styleUrls: ['./imp-dialog.component.scss'],
})
export class ImpDialogComponent {
  dat!: ImportantDialog;
  constructor(
    public dialogRef: MatDialogRef<ImpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportantDialog
  ) {
    this.dat = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
