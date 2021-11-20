import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SponsorRaw, SponsorVM } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class SponsorMapper {
  constructor(private sanitizer: DomSanitizer) {}

  mapTo(value: SponsorRaw): SponsorVM {
    console.log(value);
    
    const {
      _id = '',
      calendlyUrl = '',
      videoUrl = '',
      formUrl = '',
      ...talk
    } = value;

    return {
      id: _id,
      calendlyUrl: calendlyUrl,
      videoUrl: videoUrl,
      formUrl: formUrl,
      ...talk,
    };
  }
}
