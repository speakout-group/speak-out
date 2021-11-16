import { OnlyStagesPipe } from './only-stages.pipe';
import { OnlyStagePipe } from './only-stage.pipe';
import { OnlyLivePipe } from './only-live.pipe';
import { CommonModule } from '@angular/common';
import { IsPastPipe } from './is-past.pipe';
import { IsLivePipe } from './is-live.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [
    OnlyStagePipe,
    OnlyStagesPipe,
    OnlyLivePipe,
    IsPastPipe,
    IsLivePipe,
  ],
  exports: [
    OnlyStagePipe,
    OnlyStagesPipe,
    OnlyLivePipe,
    IsPastPipe,
    IsLivePipe,
  ],
})
export class AppUiTalksModule {}
