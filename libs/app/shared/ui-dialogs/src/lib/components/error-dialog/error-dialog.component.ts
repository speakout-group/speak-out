import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

export interface ErrorDialogData {
  title: string;
  message: string | string[];
}

@Component({
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {
  title: ErrorDialogData['title'];
  message: ErrorDialogData['message'];

  constructor(@Inject(MAT_DIALOG_DATA) data: ErrorDialogData) {
    this.title = data.title || 'Error';
    this.message =
      data.message instanceof Array ? data.message : [data.message || ''];
  }
}
