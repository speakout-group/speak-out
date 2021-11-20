import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'youtubeId' })
export class YoutubeIdPipe implements PipeTransform {

  transform(value: string) {
    const regex = new RegExp(/(((\?v=)|(\/embed\/)|(youtu.be\/)|(\/v\/)|(\/a\/u\/1\/))(.+?){11})/);
    return regex.exec(value)?.shift()
  }
}
