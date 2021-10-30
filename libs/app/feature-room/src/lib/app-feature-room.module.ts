import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { AppDataAccessModule, AuthGuard } from '@speak-out/app-data-access';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { RoomsPageComponent, RoomPageComponent } from './pages';
import { RouterModule } from '@angular/router';
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
  imports: [
    AppDataAccessModule,
    SharedUiCommonModule,
    SharedUiDialogsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoomsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: RoomPageComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class AppFeatureRoomModule {}
