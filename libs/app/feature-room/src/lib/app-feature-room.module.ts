import { AppSharedUiDialogsModule } from '@speak-out/app/shared/ui-dialogs';
import { AppSharedModulesModule } from '@speak-out/app/shared/modules';
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
  imports: [CommonModule, AppSharedModulesModule, AppSharedUiDialogsModule],
})
export class AppFeatureRoomModule {}
