import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export class AutocompleteForm<T> extends FormGroup {
  filteredOptions = this.get('control')?.valueChanges.pipe(
    startWith(''),
    map((value) => this.filter(this.options, value))
  );

  constructor(
    public options: T[],
    public filter: (options: T[], value: string) => T[]
  ) {
    super({
      control: new FormControl(''),
    });
  }
}
