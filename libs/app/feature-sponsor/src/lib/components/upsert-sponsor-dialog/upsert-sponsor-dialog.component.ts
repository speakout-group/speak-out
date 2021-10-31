import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sponsor, SponsorFacade } from '@speak-out/app-data-access';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

export enum ActionType {
  Update,
  Create,
}

export interface UpsertDialogData {
  type: ActionType;
  sponsor?: Sponsor;
}

@Component({
  selector: 'sponsor-upsert-sponsor-dialog',
  templateUrl: './upsert-sponsor-dialog.component.html',
  styleUrls: ['./upsert-sponsor-dialog.component.scss'],
})
export class UpsertSponsorDialogComponent {
  type: ActionType;
  upsertForm = this.fb.group({
    name: [''],
    logo: [''],
    slug: [''],
    color: [''],
    website: [''],
    description: [''],
    youtube: [''],
    conf: []
  });

  sponsor?: Sponsor;

  ActionType = ActionType;

  constructor(
    private fb: FormBuilder,
    private sponsorFacade: SponsorFacade,
    @Inject(MAT_DIALOG_DATA)
    readonly data: UpsertDialogData,
  ) {
    this.type = data.type;
    this.sponsor = data.sponsor;

    this.upsertForm.patchValue({
      ...this.sponsor,
    });
  }

  submit() {
    const sponsorInput = this.upsertForm.value;

    let request = this.sponsorFacade.createSponsor(sponsorInput);

    const sponsorId = this.sponsor?._id;

    if (this.type === ActionType.Update && sponsorId) {
      request = this.sponsorFacade.updateSponsor(sponsorId, sponsorInput);
    }

    // request.pipe(take(1)).subscribe((sponsor) =>
    //   this.dialogRef.close({
    //     ...sponsor,
    //     title: sponsorInput.title,
    //     isPublic: sponsorInput.isPublic,
    //   })
    // );
  }
}
