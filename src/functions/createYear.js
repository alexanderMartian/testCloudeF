import {createDate} from './createDate';
import {createMonth} from './createMonth';

export const createYear = ({
  locale = 'en-US',
  year = createDate({}).year,
  monthNumber = createDate({}).monthNumber,
}) => {
  const monthCount = 12;
  const month = createMonth({date: new Date(year, monthNumber - 1), locale});

  const getMonthDays = (monthIndex) =>
    createMonth({date: new Date(year, monthIndex), locale}).createMonthDays();

  const createYearMonths = () => {
    const Months = [];

    for (let i = 0; i <= monthCount - 1; i += 1) {
      Months[i] = getMonthDays(i);
    }

    return Months;
  };

  return {
    createYearMonths,
    month,
    year,
  };
};
