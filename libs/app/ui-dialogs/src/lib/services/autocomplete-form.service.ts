import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutocompleteFormComponent } from '../components';
import { AutocompleteFormConfig } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutocompleteFormService {

  constructor(private _dialog: MatDialog) { }

  open<T>(
    config: AutocompleteFormConfig
  ): MatDialogRef<AutocompleteFormComponent> {
    return this._dialog.open(AutocompleteFormComponent, config);
  }
}
