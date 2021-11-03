import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscribeSuccessService } from '@speak-out/app-ui-dialogs';
import { StorageData } from '@speak-out/shared-util-storage';
import { AuthFacade } from '@speak-out/app-data-access';
import { Component } from '@angular/core';

export class MemberForm extends FormGroup {
  constructor() {
    super({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}

@Component({
  selector: 'shell-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
  form = new MemberForm();

  constructor(
    private subscribe: SubscribeSuccessService,
    readonly storage: StorageData,
    readonly facade: AuthFacade,
  ) { }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.facade.register(this.form.value).subscribe((response) => {
        console.log(response);
        this.storage.set('subscribed', this.form.value.email)
        const value = this.form.value;
        this.subscribe.open({
          data: {
            message: `${value.name}, sua vaga está garantida!`
          }
        })
      });
    }
  }
  
  onGoogle() {
    this.facade.withGoogle().then((auth) => {
      this.storage.set('subscribed', this.form.value.email ?? true)
    })
  }
}
