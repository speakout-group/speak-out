import { RawTalk, Talk } from '../interfaces';

export class TalkMapper {
  mapTo(value: RawTalk): Talk {
    const { _id = '', start, end, ...talk } = value;

    return { id: _id, start: new Date(start), end: new Date(end), ...talk };
  }

  mapFrom(value: Talk): RawTalk {
    const { id, start, end, ...talk } = value;

    console.log(value);
    
    const dateStart = start instanceof Date
      ? start.toUTCString()
      : new Date(start).toUTCString()

    const dateEnd = end instanceof Date
      ? end.toUTCString()
      : new Date(end).toUTCString()

    return { _id: id, start: dateStart, end: dateEnd, ...talk };
  }
}
