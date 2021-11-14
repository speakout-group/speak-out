export interface Dates {
  start: Date;
  end: Date;
}

export const lt = (date: Date) => date >= new Date();
export const gt = (date: Date) => date <= new Date();

export const betweenDates = <T extends Dates>(entity: T) => {
  return gt(entity.start) && lt(entity.end);
};
