import { Pipe, PipeTransform } from '@angular/core';

interface User {
  _id: string;
}

@Pipe({
  name: 'inMembers',
})
export class InMembersPipe implements PipeTransform {
  transform(members: User[] | string[], id?: string) {
    if (!id) return false;

    return members
      .map((m) => {
        return typeof m === 'string' ? m : m._id;
      })
      .includes(id);
  }
}
