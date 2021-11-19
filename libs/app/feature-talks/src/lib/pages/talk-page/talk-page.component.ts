import { AuthFacade, SidenavFacade, TalkFacade } from '@speak-out/app-data-access';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  templateUrl: './talk-page.component.html',
  styleUrls: ['./talk-page.component.scss'],
})
export class TalkPageComponent implements OnInit {
  @ViewChild('bottomSheetTmpl')
  bottomSheetRef!: TemplateRef<HTMLElement>

  constructor(
    readonly auth: AuthFacade,
    readonly facade: TalkFacade,
    private bottomSheet: MatBottomSheet,
    readonly sidenav: SidenavFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.auth.loadUser();
    this.sidenav.close();
    this.loadTalk(this.route.snapshot);
    this.facade.talk$.subscribe(talk => {
      if (talk) {
        this.facade.subscribeTalk(talk.id);
      }
    });
  }

  loadTalk({ params }: ActivatedRouteSnapshot) {
    if (params.id) this.loadTalkById(params.id);
  }

  loadTalkById(id: string, event?: MouseEvent) {
    this.facade.loadTalk(id);
    if (event) {
      this.bottomSheet.dismiss();
      event.preventDefault();
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(this.bottomSheetRef, { panelClass: 'p-0' })
  }
}
