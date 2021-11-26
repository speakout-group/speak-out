import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainToolbarComponent} from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  declarations: [MainToolbarComponent],
  exports: [MainToolbarComponent],
})
export class AppUiLayoutModule {}
