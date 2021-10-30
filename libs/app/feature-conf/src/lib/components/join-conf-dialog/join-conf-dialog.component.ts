import { ConfService } from '@speak-out/app-data-access';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'conf-join-conf-dialog',
  templateUrl: './join-conf-dialog.component.html',
  styleUrls: ['./join-conf-dialog.component.scss'],
})
export class JoinConfDialogComponent {
  joinForm = this.formBuilder.group({
    code: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private confService: ConfService,
    private dialog: MatDialogRef<JoinConfDialogComponent>,
    private router: Router
  ) {}

  submit() {
    const array = this.joinForm.value.code.trim().split('/');
    const code = array[array.length - 1];

    if (!code) {
      return;
    }

    this.confService
      .getConf(code)
      .pipe(take(1))
      .subscribe((conf) => {
        this.dialog.close();

        this.router.navigate(['/conf', conf._id]);
      });
  }
}
