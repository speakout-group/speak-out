import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthFacade } from '@speak-out/app-data-access';
import { Component, OnInit } from '@angular/core';

export class MemberForm extends FormGroup {
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
    });
  }

  get username() {
    return this.get('username')
  }

  get password() {
    return this.get('password')
  }

  get email() {
    return this.get('email')
  }
}

@Component({
  selector: 'shell-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  form = new MemberForm();

  username: string | null = null;

  constructor(readonly storage: StorageData, readonly facade: AuthFacade) {}

  ngOnInit() {
    this.username = this.storage.get('username');
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.value;
      this.facade.register(value).subscribe(() => {
        this.storage.set('username', value.username);
        this.username = value.username;
        this.form.reset({});
      });
    }
  }

  onGoogle() {
    this.facade.withGoogle().then((auth) => {
      this.storage.set('subscribed', this.form.value.email ?? true);
    });
  }
}
