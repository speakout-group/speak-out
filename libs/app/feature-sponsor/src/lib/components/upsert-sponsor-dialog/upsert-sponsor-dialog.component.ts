import {
  AutocompleteForm,
  AutocompleteFormService,
} from '@speak-out/app-ui-dialogs';
import { Conf, Sponsor, SponsorFacade } from '@speak-out/app-data-access';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    name: ['', [Validators.required]],
    logo: [''],
    slug: [''],
    color: [''],
    website: [''],
    description: [''],
    youtube: [''],
    conf: ['', [Validators.required]],
  });

  sponsor?: Sponsor;

  ActionType = ActionType;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    private fb: FormBuilder,
    private autocompleteForm: AutocompleteFormService,
    private sponsorFacade: SponsorFacade,
    @Inject(MAT_DIALOG_DATA)
    readonly data: UpsertDialogData
  ) {
    this.type = data.type;
    this.sponsor = data.sponsor;

    this.upsertForm.patchValue({
      ...this.sponsor,
    });
  }

  openSearchConf() {
    const form = new AutocompleteForm<Partial<Conf>>(
      [
        {
          title: 'nome',
        },
      ],
      (options, value) => {
        const filterValue = value.toLowerCase();

        return options.filter((option) =>
          option.title?.toLowerCase().includes(filterValue)
        );
      }
    );

    this.autocompleteForm.open({
      data: { label: 'Buscar conferência', form },
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
