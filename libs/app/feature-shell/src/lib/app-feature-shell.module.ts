import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfMainContainer } from './containers/conf';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'conf/devpr2021'
      },
      {
        path: 'conf/:slug',
        component: ConfMainContainer
      },
      {
        path: '',
        loadChildren: () => import('@speak-out/app-feature-auth').then(m => m.AppFeatureAuthModule)
      }
    ])
  ],
  declarations: [
    ConfMainContainer
  ],
})
export class AppFeatureShellModule {}
