import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

export interface ConfirmDialogData {
  title: string;
  description: string | string[];
}

@Component({
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  title: ConfirmDialogData['title'];
  description: ConfirmDialogData['description'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    this.title = data?.title || 'Are you sure?';
    this.description =
      data?.description || 'You are not going to be able to undo this action';
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
