import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationData, ConfirmationResult } from '../../interfaces';
import { Component, Inject } from '@angular/core';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(
    readonly dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}

  select(selected: boolean) {
    const result: ConfirmationResult = {
      timestamp: new Date(),
      selected,
    };
    this.dialogRef.close(result);
  }
}
