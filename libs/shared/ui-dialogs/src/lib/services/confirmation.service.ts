import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ConfirmationComponent } from '../components'
import { ConfirmationConfig } from '../interfaces'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  constructor(private _dialog: MatDialog) {}

  open(
    config: ConfirmationConfig
  ): MatDialogRef<ConfirmationComponent, boolean> {
    return this._dialog.open(ConfirmationComponent, config)
  }
}
