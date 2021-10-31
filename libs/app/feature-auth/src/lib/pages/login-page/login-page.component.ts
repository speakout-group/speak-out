import { AuthFacade, AuthService } from '@speak-out/app-data-access';
import { LoginPageForm } from './login-page.form';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  // loginForm = this.formBuilder.group({
  //   username: '',
  //   password: '',
  // });

  loading = false;

  loginForm: LoginPageForm;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private facade: AuthFacade
  ) {
    this.loginForm = new LoginPageForm(this.route.snapshot.params.email);
  }

  submit() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const user = this.loginForm.value;

    this.authService
      .login(user)
      .pipe(take(1))
      .subscribe(
        (user) => {
          console.log('success: ', user);
          this.authService.redirectToCallback();
        },
        () => {
          this.loading = false;

          this.loginForm.patchValue({
            password: '',
          });
        }
      );
  }

  async loginWithFacebook() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.handleSocialLogin(() =>
        this.authService.loginWithFacebook()
      );
    } finally {
      this.loading = false;
    }
  }

  async loginWithApple() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.handleSocialLogin(() =>
        this.authService.loginWithApple()
      );
    } finally {
      this.loading = false;
    }
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
}
