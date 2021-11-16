import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReadmeComponent } from '../readme/readme.component';
import { SubscribeFacade } from '@speak-out/app-data-access';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { SubscribeForm } from './subscribe.form';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'speak-out-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();

  @ViewChild('terms') checkboxTerms!: MatCheckbox;

  form = new SubscribeForm();

  username: string | null = null;

  constructor(readonly facade: SubscribeFacade, readonly dialog: MatDialog) {}

  ngOnInit() {
    this.facade.loadUser();
  }

  openReadme(button?: MatButton) {
    const config = { maxHeight: '600px' };
    const ref = this.dialog.open(ReadmeComponent, config);
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((readed) => {
        if (readed) this.checkboxTerms.focus();
        else if (button) button.focus();
      });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.facade
        .subscribe(this.form.value)
        .pipe(takeUntil(this.destroy))
        .subscribe(() => this.form.reset({}));
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
