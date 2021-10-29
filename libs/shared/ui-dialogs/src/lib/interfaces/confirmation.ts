import { MatDialogConfig } from '@angular/material/dialog'

export interface ConfirmationData {
  icon?: string
  label?: string
  message: string
  cancel?: boolean
}

export interface ConfirmationResult {
  timestamp: Date
  selected: boolean
}

export type ConfirmationConfig = MatDialogConfig<ConfirmationData>
