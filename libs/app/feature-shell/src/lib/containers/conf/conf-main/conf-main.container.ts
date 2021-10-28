import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, AuthService } from '@speak-out/app-data-access';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './conf-main.container.html',
  styleUrls: ['./conf-main.container.scss'],
})
export class ConfMainContainer implements OnInit, OnDestroy {
  user$ = this.authService.user$
  user: User | null = null;

  destroy$ = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.authService.logout();
  }
}
