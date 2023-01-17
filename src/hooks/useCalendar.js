import {useMemo, useState} from 'react';
import {createDate} from '../functions/createDate';
import {getMonthsNames} from '../functions/getMonthsNames';
import {getWeekDaysNames} from '../functions/getWeekDaysNames';
import {createMonth} from '../functions/createMonth';
import {getYearsInterval} from '../functions/getYearsInterval';

export const useCalendar = ({locale = 'en-US', date, firstWeekDayNumber = 2}) => {
  const [selectedDate, setSelectedDate] = useState(createDate(date));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({date: new Date(selectedDate.year, selectedDate.monthIndex), locale}),
  );

  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(
    getYearsInterval(selectedDate.year),
  );

  const monthsNames = useMemo(() => {
    return getMonthsNames(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const weekDaysNames = useMemo(() => {
    return getWeekDaysNames({firstWeekDayNumber, locale});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const days = useMemo(() => {
    return selectedMonth.createMonthDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

  const calendarDays = useMemo(() => {
    const prevMonthDays = createMonth({
      date: new Date(+selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();
    const nextMonthDays = createMonth({
      date: new Date(+selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[days.length - 1];
    const shiftIndex = firstWeekDayNumber - 1;
    const DAYS_IN_WEEK = 7;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 7
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }
    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }
    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction) => {
    const monthIndex =
      direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

    if (monthIndex === -1) {
      const year = selectedYear - 1;
      setSelectedYear(year);

      !selectedYearsInterval.includes(year) && setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedMonth(createMonth({date: new Date(year, 11), locale}));
    }

    if (monthIndex === 12) {
      const year = selectedYear + 1;
      setSelectedYear(year);
      !selectedYearsInterval.includes(year) && setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedMonth(createMonth({date: new Date(year, 0), locale}));
    }

    setSelectedMonth(createMonth({date: new Date(+selectedYear, monthIndex), locale}));
  };

  const selectCalendarMonth = (monthIndex) =>
    setSelectedMonth(createMonth({date: new Date(+selectedYear, monthIndex), locale}));
  const selectCalendarYear = (year) =>
    setSelectedMonth(createMonth({date: new Date(year, selectedMonth.monthIndex), locale}));

  return {
    state: {
      calendarDays,
      weekDaysNames,
      monthsNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      setSelectedDate,
      onClickArrow,
      setSelectedYearsInterval,
      setSelectedYear,
      setSelectedMonth,
      selectCalendarMonth,
      selectCalendarYear,
    },
  };
};
