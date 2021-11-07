import { Agenda } from '../interfaces';

const lt = (date: string) => {
  return new Date(date) >= new Date();
};
const gt = (date: string) => {
  return new Date(date) <= new Date();
};

export const getOnlyLive = (agenda: Agenda[]) => {
  return agenda.find((link) => {
    return lt(link.end) && gt(link.start);
  });
};

export const isLive = (agenda: Agenda) => {
  return lt(agenda.end) && gt(agenda.start);
}

export const was = (agenda: Agenda) => {
  return lt(agenda.end);
}

export const will = (agenda: Agenda) => {
  return gt(agenda.start);
}