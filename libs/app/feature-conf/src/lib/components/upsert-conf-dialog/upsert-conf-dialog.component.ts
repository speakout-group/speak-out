import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conf, ConfService } from '@speak-out/app-data-access';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

export enum ActionType {
  Update,
  Create,
}

export interface UpsertDialogData {
  type: ActionType;
  conf?: Conf;
}

@Component({
  selector: 'conf-upsert-conf-dialog',
  templateUrl: './upsert-conf-dialog.component.html',
  styleUrls: ['./upsert-conf-dialog.component.scss'],
})
export class UpsertConfDialogComponent {
  type: ActionType;
  upsertForm = this.formBuilder.group({
    title: '',
    isPublic: false,
  });

  conf?: Conf;

  ActionType = ActionType;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: UpsertDialogData,
    private confService: ConfService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpsertConfDialogComponent>
  ) {
    this.type = data.type;
    this.conf = data.conf;

    this.upsertForm.patchValue({
      ...this.conf,
    });
  }

  submit() {
    const confInput = this.upsertForm.value;

    let request = this.confService.createConf(confInput);

    const confId = this.conf?._id;

    if (this.type === ActionType.Update && confId) {
      request = this.confService.updateConf(confId, confInput);
    }

    request.pipe(take(1)).subscribe((conf) =>
      this.dialogRef.close({
        ...conf,
        title: confInput.title,
        isPublic: confInput.isPublic,
      })
    );
  }
}
