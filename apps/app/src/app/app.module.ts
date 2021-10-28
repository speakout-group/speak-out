import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppDataAccessModule } from '@speak-out/app-data-access';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppDataAccessModule.forRoot(environment),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
