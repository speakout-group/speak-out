import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room, RoomService } from '@speak-out/app-data-access';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

export enum ActionType {
  Update,
  Create,
}

export interface UpsertDialogData {
  type: ActionType;
  room?: Room;
}

@Component({
  selector: 'room-upsert-room-dialog',
  templateUrl: './upsert-room-dialog.component.html',
  styleUrls: ['./upsert-room-dialog.component.scss'],
})
export class UpsertRoomDialogComponent {
  type: ActionType;
  upsertForm = this.fb.group({
    title: '',
    isPublic: [false],
  });

  room?: Room;

  ActionType = ActionType;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: UpsertDialogData,
    private roomService: RoomService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpsertRoomDialogComponent>
  ) {
    this.type = data.type;
    this.room = data.room;

    this.upsertForm.patchValue({
      ...this.room,
    });
  }

  submit() {
    const roomInput = this.upsertForm.value;

    let request = this.roomService.createRoom(roomInput);

    const roomId = this.room?._id;

    if (this.type === ActionType.Update && roomId) {
      request = this.roomService.updateRoom(roomId, roomInput);
    }

    request.pipe(take(1)).subscribe((room) =>
      this.dialogRef.close({
        ...room,
        title: roomInput.title,
        isPublic: roomInput.isPublic,
      })
    );
  }
}
