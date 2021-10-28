import { RoomService } from '@speak-out/app-data-access';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'room-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss'],
})
export class JoinRoomDialogComponent {
  joinForm = this.formBuilder.group({
    code: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private dialog: MatDialogRef<JoinRoomDialogComponent>,
    private router: Router,
  ) {}

  submit() {
    const array = this.joinForm.value.code.trim().split('/');
    const code = array[array.length - 1];

    if (!code) {
      return;
    }

    this.roomService
      .getRoom(code)
      .pipe(take(1))
      .subscribe(room => {
        this.dialog.close();

        this.router.navigate(['/room', room._id]);
      });
  }
}
