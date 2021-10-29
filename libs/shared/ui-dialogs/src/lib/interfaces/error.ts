import { MatDialogConfig } from '@angular/material/dialog'

export interface ErrorData {
  icon?: string
  title?: string
  message: string
  close?: boolean
}

export interface ErrorResult {
  timestamp: Date
  selected: boolean
}

export type ErrorConfig = MatDialogConfig<ErrorData>
