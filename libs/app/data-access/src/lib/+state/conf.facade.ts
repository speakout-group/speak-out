import { ConfService } from '../services/conf.service';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { Conf } from '../interfaces';

export interface ConfState {
  loading: boolean;
  publicConfs: Conf[];
  memberConfs: Conf[];
  userConfs: Conf[];
}

@Injectable()
export class ConfFacade extends BaseState<ConfState> {
  loading$ = this.select((state) => state.loading)
  
  publicConfs$ = this.select((state) => state.publicConfs)
  memberConfs$ = this.select((state) => state.memberConfs)
  userConfs$ = this.select((state) => state.userConfs)

  constructor(private _service: ConfService) {
    super({
      loading: false,
      publicConfs: [],
      memberConfs: [],
      userConfs: [],
    });
  }

  loadUserConfs() {
    this.setState({ loading: true });
    this._service.getUserConfs().subscribe((userConfs) => {
      this.setState({ userConfs });
      this.setState({ loading: false });
    });
  }

  loadPublicConfs() {
    this.setState({ loading: true });
    this._service.getPublicConfs().subscribe((publicConfs) => {
      this.setState({ publicConfs });
      this.setState({ loading: false });
    });
  }

  loadMemberConfs() {
    this.setState({ loading: true });
    this._service.getConfsByMember().subscribe((memberConfs) => {
      this.setState({ memberConfs });
      this.setState({ loading: false });
    });
  }
}
