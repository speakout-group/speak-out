import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SubscribeSuccessComponent } from '../components';
import { SubscribeSuccessConfig } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubscribeSuccessService {

  constructor(private _dialog: MatDialog) { }

  open(
    config: SubscribeSuccessConfig
  ): MatDialogRef<SubscribeSuccessComponent> {
    return this._dialog.open(SubscribeSuccessComponent, config);
  }
}
