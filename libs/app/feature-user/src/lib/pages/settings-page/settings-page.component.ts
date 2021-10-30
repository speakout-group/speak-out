import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  AuthService,
  UserService,
  UpdatePasswordBody,
} from '@speak-out/app-data-access';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  settingsForm = this.formBuilder.group({
    username: '',
    email: '',
    currentPassword: null,
    password: null,
    confirmPassword: null,
  });

  loading = false;

  get user() {
    return this.authService.user;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    if (this.authService.user) {
      const { username, email } = this.authService.user;
      this.settingsForm.patchValue({
        username,
        email,
      });
    }
  }

  updateUsername() {
    const { username } = this.settingsForm.value;

    if (this.loading || this.user?.username === username) {
      return;
    }

    this.loading = true;

    this.userService
      .updateUsername(username)
      .pipe(take(1))
      .subscribe(
        () => {
          // this.authService._user.next({
          //   ...this.authService.user,
          //   username,
          // });

          this.loading = false;

          Swal.fire({
            title: 'Good job!',
            text: 'Your username was sucessfully updated!',
            icon: 'success',
          });
        },
        () => (this.loading = false)
      );
  }

  updateEmail() {
    const { email } = this.settingsForm.value;

    if (this.loading || this.user?.email === email) {
      return;
    }

    this.loading = true;

    // this.userService
    //   .updateEmail(email)
    //   .pipe(take(1))
    //   .subscribe(
    //     () => {
    //       this.authService.user$.next({
    //         ...this.authService.user,
    //         email,
    //       });

    //       this.loading = false;

    //       Swal.fire({
    //         title: 'Good job!',
    //         text: 'Your email was sucessfully updated!',
    //         icon: 'success',
    //       });
    //     },
    //     () => (this.loading = false),
    //   );
  }

  updatePassword() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const clear = () => {
      this.loading = false;

      this.settingsForm.patchValue({
        currentPassword: null,
        password: null,
        confirmPassword: null,
      });
    };

    const data: UpdatePasswordBody = this.settingsForm.value;

    this.userService
      .updatePassword(data)
      .pipe(take(1))
      .subscribe(async () => {
        clear();

        await Swal.fire({
          title: 'Good job!',
          text: 'Your password was sucessfully updated!',
          icon: 'success',
        });

        this.openLogoutDialog();
      }, clear);
  }

  private openLogoutDialog() {
    const data = {
      label: 'Global logout',
      message: 'Do you want to logout from all of your devices?',
    };
    const ref = this.confirmation.open({ data });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.logoutFromAllDevices();
        }
      });
  }

  private logoutFromAllDevices() {
    this.authService
      .logoutFromAllDevices()
      .pipe(take(1))
      .subscribe(() =>
        Swal.fire({
          title: 'Good job!',
          text: 'All of your devices were successfully logged out!',
          icon: 'success',
        })
      );
  }
}
