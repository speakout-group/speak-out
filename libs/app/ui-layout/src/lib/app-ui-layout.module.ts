import { MainToolbarComponent, YoutubeVideoComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
  declarations: [MainToolbarComponent, YoutubeVideoComponent],
  exports: [MainToolbarComponent, YoutubeVideoComponent],
})
export class AppUiLayoutModule {}
