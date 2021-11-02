import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conf, ConfFacade, ConfService } from '@speak-out/app-data-access';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs/operators';

export enum ActionType {
  Update,
  Create,
}

export interface UpsertDialogData {
  type: ActionType;
  conf?: Conf;
}

export class ConfForm extends FormGroup {
  constructor(value: Partial<Conf> = {}) {
    super({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', []),
      isPublic: new FormControl(true),
    });

    this.patchValue(value);
  }

  get start() {
    return this.get('start');
  }

  get end() {
    return this.get('end');
  }

  get isPublic() {
    return this.get('isPublic');
  }
}

@Component({
  selector: 'conf-upsert-conf-dialog',
  templateUrl: './upsert-conf-dialog.component.html',
  styleUrls: ['./upsert-conf-dialog.component.scss'],
})
export class UpsertConfDialogComponent {
  type: ActionType;
  ActionType = ActionType;

  form: ConfForm;
  conf?: Conf;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: UpsertDialogData,
    private dialogRef: MatDialogRef<UpsertConfDialogComponent>,
    private confService: ConfService,
    private facade: ConfFacade
  ) {
    this.type = data.type;
    this.conf = data.conf;
    this.form = new ConfForm(data.conf);

    // this.upsertForm.patchValue({
    //   ...this.conf,
    // });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.facade.createConf(this.form.value);
    }
  }

  submit() {
    const confInput = this.form.value;

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
