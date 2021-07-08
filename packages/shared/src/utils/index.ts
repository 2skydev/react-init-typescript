/*
 * 첫글자만 대문자로 변경
 * - str: 첫글자만 대문자로 변경할 문자열
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/*
 * 배열에서 특정 index 요소 삭제
 * - arr: 참고할 배열
 * - index: 삭제할 요소의 index
 */
export const arrayRemoveIndex = (arr: any[], index: number) => {
  const clone = [...arr];

  clone.splice(index, 1);

  return clone;
};
