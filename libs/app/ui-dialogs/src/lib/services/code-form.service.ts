import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CodeFormComponent } from '../components';
import { CodeFormConfig } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeFormService {

  constructor(private _dialog: MatDialog) { }

  open(
    config: CodeFormConfig
  ): MatDialogRef<CodeFormComponent, boolean> {
    return this._dialog.open(CodeFormComponent, config);
  }
}
