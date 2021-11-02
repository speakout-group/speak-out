import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AutocompleteFormData } from '../../interfaces';

@Component({
  selector: 'app-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss'],
})
export class AutocompleteFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: AutocompleteFormData
  ) {}

  ngOnInit(): void {
    console.log('oi');
  }
}
