import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AutocompleteFormService,
  CodeFormService,
  SubscribeSuccessService,
} from './services';
import {
  SubscribeSuccessComponent,
  AutocompleteFormComponent,
  CodeFormComponent,
} from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
  ],
  declarations: [
    CodeFormComponent,
    AutocompleteFormComponent,
    SubscribeSuccessComponent,
  ],
  providers: [
    CodeFormService,
    SubscribeSuccessService,
    AutocompleteFormService,
  ],
})
export class AppUiDialogsModule {}