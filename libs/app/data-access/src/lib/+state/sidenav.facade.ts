import { Injectable } from '@angular/core';
import { BaseState } from './base.state';

interface SidenavState {
  opened: boolean;
}

@Injectable()
export class SidenavFacade extends BaseState<SidenavState> {

  opened$ = this.select(state => state.opened);

  constructor() {
    super({
      opened: false
    })
  }

  open() {
    this.setState({ opened: true });
  }

  close() {
    this.setState({ opened: false });
  }
}