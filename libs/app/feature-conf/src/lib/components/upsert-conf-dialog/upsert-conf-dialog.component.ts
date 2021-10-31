import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conf, ConfFacade, ConfService } from '@speak-out/app-data-access';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    title: [''],
    description: [''],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    isPublic: [true, Validators.requiredTrue],
  });

  conf?: Conf;

  ActionType = ActionType;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: UpsertDialogData,
    private dialogRef: MatDialogRef<UpsertConfDialogComponent>,
    private confService: ConfService,
    private formBuilder: FormBuilder,
    private facade: ConfFacade,
  ) {
    this.type = data.type;
    this.conf = data.conf;

    this.upsertForm.patchValue({
      ...this.conf,
    });
  }

  onSubmit() {
    if (this.upsertForm.valid) {
      this.facade.createConf(this.upsertForm.value)
    }
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
