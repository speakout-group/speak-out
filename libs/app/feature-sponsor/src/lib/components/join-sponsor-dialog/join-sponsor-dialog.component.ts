import { SponsorFacade } from '@speak-out/app-data-access';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sponsor-join-sponsor-dialog',
  templateUrl: './join-sponsor-dialog.component.html',
  styleUrls: ['./join-sponsor-dialog.component.scss'],
})
export class JoinSponsorDialogComponent {
  joinForm = this.formBuilder.group({
    code: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private sponsorFacade: SponsorFacade,
    private dialog: MatDialogRef<JoinSponsorDialogComponent>,
    private router: Router
  ) {}

  submit() {
    const array = this.joinForm.value.code.trim().split('/');
    const code = array[array.length - 1];

    if (!code) {
      return;
    }

    this.sponsorFacade.loadSponsor(code);
    // .pipe(take(1))
    // .subscribe((sponsor) => {
    //   this.dialog.close();

    //   this.router.navigate(['/sponsor', sponsor._id]);
    // });
  }
}
