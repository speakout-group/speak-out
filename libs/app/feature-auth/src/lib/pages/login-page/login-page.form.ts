import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginPageForm extends FormGroup {
  constructor(username = '') {
    super({
      username: new FormControl(username, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }
}
