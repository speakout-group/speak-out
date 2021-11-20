import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedUiCommonModule } from '@speak-out/shared-ui-common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    SharedUiCommonModule
  ],
  declarations: [MainToolbarComponent, YoutubeVideoComponent],
  exports: [MainToolbarComponent, YoutubeVideoComponent],
})
export class AppUiLayoutModule {}
