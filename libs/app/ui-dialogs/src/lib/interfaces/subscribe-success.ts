import { MatDialogConfig } from '@angular/material/dialog';

export interface SubscribeSuccessData {
  icon?: string;
  label?: string;
  message: string;
  cancel?: boolean;
}

export interface SubscribeSuccessResult {
  timestamp: Date;
  code: string;
}

export type SubscribeSuccessConfig = MatDialogConfig<SubscribeSuccessData>;
