// import { ConfirmDialogComponent } from '@speak-out/shared-ui-dialogs';
import { ConfirmationService } from '@speak-out/shared-ui-dialogs';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import {
  Room,
  User,
  RoomService,
  updateItem,
} from '@speak-out/app-data-access';
import { take, tap } from 'rxjs/operators';
import { remove } from 'lodash';
import {
  ActionType,
  UpsertRoomDialogComponent,
} from '../upsert-room-dialog/upsert-room-dialog.component';

@Component({
  selector: 'room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss'],
})
export class RoomItemComponent implements OnInit {
  @Input() room!: Room;
  @Input() user!: User;
  @Input() publicRooms: Room[] = [];
  @Input() userRooms: Room[] = [];
  @Input() memberRooms: Room[] = [];

  loading = false;
  isOwner = false;

  get isMember() {
    return this.memberRooms.some((e) => e._id === this.room._id);
  }

  constructor(
    private confirmationService: ConfirmationService,
    private roomService: RoomService,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOwner =
      this.room.owner === this.user._id ||
      (this.room.owner as User)._id === this.user._id;
  }

  openUpdateDialog() {
    const dialog = this.dialog.open(UpsertRoomDialogComponent, {
      data: {
        type: ActionType.Update,
        room: this.room,
      },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((updatedRoom: Room) => {
        updateItem(
          this.publicRooms,
          (r) => r._id === this.room._id,
          updatedRoom
        );
        updateItem(
          this.memberRooms,
          (r) => r._id === this.room._id,
          updatedRoom
        );
        updateItem(this.userRooms, (r) => r._id === this.room._id, updatedRoom);
      });
  }

  confirmDelete() {
    const ref = this.confirmationService.open({});
    // const dialog = this.dialog.open(ConfirmDialogComponent);

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.delete();
        }
      });
  }

  delete() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.roomService
      .deleteRoom(this.room)
      .pipe(take(1))
      .subscribe(() => {
        this.loading = false;

        remove(this.userRooms, (r) => r._id === this.room._id);
        remove(this.publicRooms, (r) => r._id === this.room._id);
        remove(this.memberRooms, (r) => r._id === this.room._id);
      });
  }

  joinRoom() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.roomService
      .getRoom(this.room._id)
      .pipe(take(1), tap(process, process))
      .subscribe(() => this.router.navigate(['/room', this.room._id]));
  }

  confirmLeaveRoom() {
    // const dialog = this.dialog.open(ConfirmDialogComponent);
    const ref = this.confirmationService.open({});

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.leaveRoom();
        }
      });
  }

  leaveRoom() {
    this.loading = true;

    const process = () => (this.loading = false);

    this.roomService
      .leaveRoom(this.room._id)
      .pipe(take(1), tap(process, process))
      .subscribe(() =>
        remove(this.memberRooms, (r) => r._id === this.room._id)
      );
  }

  copyUrl() {
    this.clipboard.copy(`${window.location.origin}/room/${this.room._id}`);
  }

  isString<T>(value: T) {
    return typeof value === 'string';
  }
}
