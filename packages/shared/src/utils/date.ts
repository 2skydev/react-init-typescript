import moment, { MomentInput } from 'moment';

/*
 * 타임스탬프를 원하는 포맷으로 변경 (기본 YYYY.MM.DD)
 * - timestamp: 0000-00-00T00:00:00Z00 포맷 형식의 타임스탬프
 * - foramt: 변경할 포맷 문자열 (참고: https://momentjs.com/docs/#/parsing/string-format/)
 */
export const format = (momentInput: MomentInput, foramt = 'YYYY.MM.DD') => {
  return moment(momentInput).format(foramt);
};

// export const add = (momentInput: MomentInput, num: number, type = 'month') => {
//   return format(moment(momentInput).add(num, type), 'YYYY.MM.DD');
// };
