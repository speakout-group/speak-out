import { ConfService } from '../services/conf.service';
import { slugify } from '../utils/slugify';
import { Injectable } from '@angular/core';
import { BaseState } from './base.state';
import { Conf } from '../interfaces';

export interface ConfState {
  loading: boolean;
  publicConfs: Conf[];
  memberConfs: Conf[];
  userConfs: Conf[];
  conf: Conf | null;
}

@Injectable()
export class ConfFacade extends BaseState<ConfState> {
  loading$ = this.select((state) => state.loading);

  publicConfs$ = this.select((state) => state.publicConfs);

  memberConfs$ = this.select((state) => state.memberConfs);
  
  userConfs$ = this.select((state) => state.userConfs);
  
  conf$ = this.select((state) => state.conf);

  constructor(private service: ConfService) {
    super({
      loading: false,
      publicConfs: [],
      memberConfs: [],
      userConfs: [],
      conf: null,
    });
  }

  loadConf(id: string) {
    this.setState({ loading: true });
    this.service.getConf(id).subscribe((conf) => {
      this.setState({ conf });
      this.setState({ loading: false });
    });
  }

  createConf(conf: Exclude<Conf, '_id' | 'members' | 'owner' | 'slug'>) {
    this.setState({ loading: true });
    conf.slug = slugify(conf.title);
    this.service.createConf(conf).subscribe((response) => {
      console.log(response);
      
      // this.setState({ conf });
      this.setState({ loading: false });
    });
  }

  joinConf(id: string) {
    this.setState({ loading: true });
    this.service.joinConf(id).subscribe((conf) => {
      this.setState({ conf });
      this.setState({ loading: false });
    });
  }

  loadUserConfs() {
    this.setState({ loading: true });
    this.service.getUserConfs().subscribe((userConfs) => {
      this.setState({ userConfs });
      this.setState({ loading: false });
    });
  }

  loadPublicConfs() {
    this.setState({ loading: true });
    this.service.getPublicConfs().subscribe((publicConfs) => {
      this.setState({ publicConfs });
      this.setState({ loading: false });
    });
  }

  loadMemberConfs() {
    this.setState({ loading: true });
    this.service.getConfsByMember().subscribe((memberConfs) => {
      this.setState({ memberConfs });
      this.setState({ loading: false });
    });
  }
}
