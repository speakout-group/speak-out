import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorData, ErrorResult } from '../../interfaces';
import { Component, Inject } from '@angular/core';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  constructor(
    readonly dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorData
  ) {}

  select(selected: boolean) {
    const result: ErrorResult = {
      timestamp: new Date(),
      selected,
    };
    this.dialogRef.close(result);
  }
}
