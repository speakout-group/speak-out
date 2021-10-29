import { NgModule } from '@angular/core';
import { MessagesComponent } from './components';
import { AppSharedModulesModule } from '@speak-out/app/shared/modules';
import { DirectMessagePageComponent } from './containers';

@NgModule({
  declarations: [MessagesComponent, DirectMessagePageComponent],
  imports: [AppSharedModulesModule],
  exports: [MessagesComponent, DirectMessagePageComponent],
})
export class AppChatFeatureMessagesModule {}
