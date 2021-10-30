import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorComponent } from '../components';
import { ErrorConfig } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private _dialog: MatDialog) {}

  open(config: ErrorConfig): MatDialogRef<ErrorComponent, boolean> {
    return this._dialog.open(ErrorComponent, config);
  }
}
