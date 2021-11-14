import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Talk, TalkWithSafeUrl } from '@speak-out/app-data-access';

export type TalkFormValue = Pick<
  Talk,
  | 'id'
  | 'title'
  | 'description'
  | 'cover'
  | 'name'
  | 'photo'
  | 'bio'
  | 'group'
  | 'stage'
  | 'ytid'
>;

export class TalkForm extends FormGroup {
  constructor(talk?: Talk | TalkWithSafeUrl) {
    const validator = !talk ? [Validators.required] : [];

    super({
      id: new FormControl(talk?.id, validator),
      title: new FormControl(talk?.title, validator),
      description: new FormControl(talk?.description, validator),
      cover: new FormControl(talk?.cover, validator),
      name: new FormControl(talk?.name, validator),
      photo: new FormControl(talk?.photo, validator),
      bio: new FormControl(talk?.bio, validator),
      group: new FormControl(talk?.group, validator),
      stage: new FormControl(talk?.stage, validator),
      ytid: new FormControl(talk?.ytid, validator),
    });
  }

  populate(talk: Talk | TalkWithSafeUrl) {
    this.setValue(this.mapToValue(talk));
  }

  mapToValue(talk: Talk): TalkFormValue {
    return {
      id: talk?.id,
      title: talk?.title,
      description: talk?.description,
      cover: talk?.cover,
      name: talk?.name,
      photo: talk?.photo,
      bio: talk?.bio,
      group: talk?.group,
      stage: talk?.stage,
      ytid: talk?.ytid,
    };
  }
}
