import {createDate} from './createDate';
import {getMonthNumberOfDays} from './getMonthNumberOfDays';

export const createMonth = ({date = new Date(), locale = 'en-US'}) => {
  const d = createDate({locale, date});
  const {month: monthName, year, monthNumber, monthIndex} = d;

  const getDay = (dayNumber) => createDate({locale, date: new Date(year, monthIndex, dayNumber)});

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
  };
};
