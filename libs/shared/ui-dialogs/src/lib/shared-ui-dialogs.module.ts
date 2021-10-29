import { ConfirmationComponent, ErrorComponent } from './components'
import { ConfirmationService, ErrorService } from './services'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ConfirmationComponent, ErrorComponent],
  providers: [ConfirmationService, ErrorService],
  exports: [ConfirmationComponent, ErrorComponent],
})
export class SharedUiDialogsModule {}
