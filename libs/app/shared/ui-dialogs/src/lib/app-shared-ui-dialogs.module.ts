import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent, ErrorDialogComponent } from './components';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [ErrorDialogComponent, ConfirmDialogComponent],
  exports: [ErrorDialogComponent, ConfirmDialogComponent],
})
export class AppSharedUiDialogsModule {}
