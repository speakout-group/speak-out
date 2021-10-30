import { RecoverService } from '@speak-out/app-data-access';
import { FormBuilder } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './recover-page.component.html',
  styleUrls: ['./recover-page.component.scss'],
})
export class RecoverPageComponent {
  recoverForm = this.fb.group({
    email: '',
  });

  loading = false;

  constructor(
    private recoverService: RecoverService,
    private fb: FormBuilder,
  ) {}

  submit() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const clear = () => {
      this.loading = false;

      this.recoverForm.patchValue({ email: '' });
    };

    this.recoverService
      .recoverPassword(this.recoverForm.value.email)
      .pipe(tap(clear, clear), take(1))
      .subscribe(() =>
        Swal.fire({
          title: 'Good job!',
          text: 'Check your email and change your password!',
          icon: 'success',
        }),
      );
  }
}
