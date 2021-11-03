import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscribeSuccessData } from '../../interfaces';
import { Component, Inject } from '@angular/core';

export interface Section {
  name: string;
  date: Date;
}

@Component({
  templateUrl: './subscribe-success.component.html',
  styleUrls: ['./subscribe-success.component.scss']
})
export class SubscribeSuccessComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: SubscribeSuccessData
  ) {}
  folders: Section[] = [
    {
      name: 'Keynote 1',
      date: new Date('11/20/21 09:00:00'),
    },
    {
      name: 'BEMUG',
      date: new Date('11/20/21 10:00:00'),
    },
    {
      name: 'Agile MGA',
      date: new Date('11/20/21 10:00:00'),
    },
    {
      name: 'lxDA',
      date: new Date('11/20/21 10:00:00'),
    },
    {
      name: 'Agile MGA 2',
      date: new Date('11/20/21 11:00:00'),
    },
    {
      name: 'DevParaná Campo Mourão',
      date: new Date('11/20/21 11:00:00'),
    },
    {
      name: 'DevGirls',
      date: new Date('11/20/21 11:00:00'),
    },
    {
      name: 'Almoço',
      date: new Date('11/20/21 12:00:00'),
    },
    {
      name: 'DevOps Maringá',
      date: new Date('11/20/21 13:30:00'),
    },
    {
      name: 'Front In Maringá',
      date: new Date('11/20/21 13:30:00'),
    },
    {
      name: 'DevCia',
      date: new Date('11/20/21 13:30:00'),
    },
    {
      name: 'Ingá PHP',
      date: new Date('11/20/21 14:30:00'),
    },
    {
      name: 'GDG Cascavel',
      date: new Date('11/20/21 14:30:00'),
    },
    {
      name: 'GDG Toledo',
      date: new Date('11/20/21 14:30:00'),
    },
    {
      name: 'Intervalo / Coffee',
      date: new Date('11/20/21 15:30:00'),
    },
    {
      name: 'DevParaná Umuarama',
      date: new Date('11/20/21 16:00:00'),
    },
    {
      name: 'Delphi Ingá',
      date: new Date('11/20/21 16:00:00'),
    },
    {
      name: 'Afterdata',
      date: new Date('11/20/21 16:00:00'),
    },
    {
      name: 'Keynote 2',
      date: new Date('11/20/21 17:00:00'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Robert C. Martin (Uncle Bob)',
      date: new Date('11/18/21'),
    },
  ];
}
