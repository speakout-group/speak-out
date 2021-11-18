import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainToolbarComponent, CompatBrowserComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  declarations: [MainToolbarComponent, CompatBrowserComponent],
  exports: [MainToolbarComponent, CompatBrowserComponent],
})
export class AppUiLayoutModule {}
