import { SharedUiDialogsModule } from '@speak-out/shared-ui-dialogs';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { ConfsPageComponent, ConfPageComponent } from './pages';
import { NgModule } from '@angular/core';
import {
  ConfItemComponent,
  JoinConfDialogComponent,
  UpsertConfDialogComponent,
} from './components';
import { RouterModule } from '@angular/router';
import { AppDataAccessModule } from '@speak-out/app-data-access';

@NgModule({
  declarations: [
    ConfsPageComponent,
    UpsertConfDialogComponent,
    JoinConfDialogComponent,
    ConfPageComponent,
    ConfItemComponent,
  ],
  exports: [ConfPageComponent, ConfsPageComponent],
  imports: [
    AppDataAccessModule,
    SharedUiDialogsModule,
    SharedUiCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfsPageComponent
      },
      {
        path: ':id',
        component: ConfPageComponent
      }
    ]),
  ],
})
export class AppFeatureConfModule {}
