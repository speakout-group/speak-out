import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { RoomsPageComponent, RoomPageComponent } from './pages';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RoomItemComponent,
  JoinRoomDialogComponent,
  UpsertRoomDialogComponent,
} from './components';

@NgModule({
  declarations: [
    RoomsPageComponent,
    UpsertRoomDialogComponent,
    JoinRoomDialogComponent,
    RoomPageComponent,
    RoomItemComponent,
  ],
  exports: [RoomPageComponent, RoomsPageComponent],
  imports: [CommonModule, SharedUiDialogsModule, SharedUiCommonModule],
})
export class AppFeatureRoomModule {}
