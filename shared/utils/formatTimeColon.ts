import prefixZero from './prefixZero';

const formatTimeColon = (time: { hours: number; minutes: number }) =>
  `${prefixZero(time.hours)}:${prefixZero(time.minutes)}`;

export default formatTimeColon;
