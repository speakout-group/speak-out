import { RawTalk, Talk } from '../interfaces';

export class TalkMapper {
  mapTo(value: RawTalk): Talk {
    const { _id, start, end, ...talk } = value;
    
    return { id: _id, start: new Date(start), end: new Date(end), ...talk }
  }
}