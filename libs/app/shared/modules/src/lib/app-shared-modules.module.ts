import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    // RouterModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AppSharedModulesModule {}
