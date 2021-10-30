import { ErrorComponent, ConfirmationComponent } from './components';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ErrorService } from './services';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [ErrorComponent, ConfirmationComponent],
  exports: [ErrorComponent, ConfirmationComponent],
  providers: [ErrorService],
})
export class SharedUiDialogsModule {}
