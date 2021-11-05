import { AuthFacade, AuthService } from '@speak-out/app-data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPageForm } from './login-page.form';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  loading = false;

  loginForm = new LoginPageForm();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    readonly facade: AuthFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.prepareRedirect(this.route);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.facade.login(this.loginForm.value);
      this.facade.redirect$
        .pipe(takeUntil(this.destroy))
        .subscribe((redirectUrl) => {
          console.log('redirectUrl', redirectUrl);

          this.router.navigateByUrl(redirectUrl as string);
        });
    }
  }

  prepareRedirect({ snapshot }: ActivatedRoute) {
    const url = snapshot.queryParams.returnUrl;
    this.facade.setRedirect(url ?? '/confs');
  }

  async loginWithGoogle() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.handleSocialLogin(() =>
        this.authService.loginWithGoogle()
      );
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
