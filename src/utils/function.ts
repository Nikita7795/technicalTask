import { differenceInHours, intlFormat, isValid } from "date-fns";

export function getCommentsLabel(count: number) {
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'комментариев';
  }
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return 'комментарий';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'комментария';
  }
  return 'комментариев';
}

export function getHourEnding(number: number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return 'час';
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14)) {
    return 'часа';
  } else {
    return 'часов';
  }
}

export const intlFormatHourDate = (date: string) => {
  if (isValid(new Date(date))) {
    const hoursInDay = 24
    const differenceHours = differenceInHours(new Date(), date)
    if (differenceHours < hoursInDay) {
      return `${differenceHours} ${getHourEnding(differenceHours)} назад`;
    } else {
      return intlFormat(date, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    }
  } else {
    return ''
  }
};