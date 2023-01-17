import {createDate} from './createDate';

export const getMonthsNames = (locale = 'en-US') => {
  const monthsNames = Array.from({length: 12});
  const d = new Date();

  monthsNames.forEach((_, i) => {
    const {month, monthIndex, monthShort, date} = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1),
    });

    monthsNames[monthIndex] = {month, monthIndex, monthShort, date};
  });

  return monthsNames;
};
