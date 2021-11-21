import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VisibilityDirective } from './directives/visibility.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IsChromiumVersionDirective } from './directives/is-chromium-version.directive';
import { CompatBrowserComponent } from './components/compat-browser/compat-browser.component';
import { IsChromiumVersionPipe } from './pipes/is-chromium-version.pipe';

@NgModule({
  imports: [
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatToolbarModule,
    VisibilityDirective,
    SanitizeUrlPipe,
    IsChromiumVersionDirective,
    CompatBrowserComponent,
    IsChromiumVersionPipe,
  ],
  declarations: [VisibilityDirective, SanitizeUrlPipe, IsChromiumVersionDirective, CompatBrowserComponent, IsChromiumVersionPipe],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class SharedUiCommonModule {}
