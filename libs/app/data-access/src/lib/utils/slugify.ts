/* eslint-disable no-useless-escape */

const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
const p = new RegExp(a.split('').join('|'), 'g');

export function dropSpecialChars(str: string) {
  return str.toString().replace(p, (c) => b.charAt(a.indexOf(c)));
}

export function slugify(string: string) {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
