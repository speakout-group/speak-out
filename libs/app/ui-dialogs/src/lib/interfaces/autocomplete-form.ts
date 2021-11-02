import { MatDialogConfig } from '@angular/material/dialog';
import { AutocompleteForm } from '../components';

export interface AutocompleteFormData<T = any> {
  label: string;
  form: AutocompleteForm<T>;
  cancel?: boolean;
}

export interface AutocompleteFormResult<T> {
  timestamp: Date;
  value: T;
}

export type AutocompleteFormConfig = MatDialogConfig<AutocompleteFormData>;
