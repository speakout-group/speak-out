import { MatDialogConfig } from '@angular/material/dialog';

export interface CodeFormData {
  icon?: string;
  label?: string;
  message: string;
  cancel?: boolean;
}

export interface CodeFormResult {
  timestamp: Date;
  code: string;
}

export type CodeFormConfig = MatDialogConfig<CodeFormData>;
