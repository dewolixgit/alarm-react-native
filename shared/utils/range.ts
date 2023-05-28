import pipe from './pipe';

const range = (length: number): number[] =>
  pipe(length, (l) => Array(l).keys(), Array.from<number>);

export default range;
