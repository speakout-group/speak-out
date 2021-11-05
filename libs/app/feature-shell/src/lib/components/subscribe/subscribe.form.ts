import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SubscribeForm extends FormGroup {
  constructor() {
    super({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      terms: new FormControl(false, [Validators.requiredTrue]),
      privacy: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  get firstStepValid() {
    const username = this.username?.valid;
    const password = this.password?.valid;
    const email = this.email?.valid;
    return username && password && email;
  }

  get username() {
    return this.get('username');
  }

  get password() {
    return this.get('password');
  }

  get email() {
    return this.get('email');
  }

  get terms() {
    return this.get('terms');
  }

  get privacy() {
    return this.get('privacy');
  }
}
