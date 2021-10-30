import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecoverService } from '@speak-out/app-data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, take, takeUntil } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './recover-change-password-page.component.html',
  styleUrls: ['./recover-change-password-page.component.scss'],
})
export class RecoverChangePasswordPageComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();

  changePasswordForm = this.formBuilder.group({
    password: '',
    confirmPassword: '',
  });

  code = '';

  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private recoverService: RecoverService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this._destroy),
        mergeMap(({ code }) => {
          this.code = code;

          return this.recoverService.validateCode(this.code).pipe(take(1));
        }),
      )
      .subscribe(
        () => (this.loading = false),
        () => this.router.navigate(['/']),
      );
  }

  ngOnDestroy() {
    this._destroy.next()
    this._destroy.complete()
  }

  submit() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const clear = () => {
      this.loading = false;

      this.changePasswordForm.patchValue({
        password: '',
        confirmPassword: '',
      });
    };

    this.recoverService
      .changePassword(this.code, this.changePasswordForm.value)
      .pipe(take(1))
      .subscribe(() => {
        this.loading = false;

        Swal.fire({
          title: 'Good job!',
          text: 'Your password was sucessfully updated!',
          icon: 'success',
        });

        this.router.navigate(['/auth', 'login']);
      }, clear);
  }
}
