export const FILTER_DATES = 'FILTER_DATES';

export function changeDates(start, end) {
  return { type: FILTER_DATES, start, end };
}
