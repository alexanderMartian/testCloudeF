import {createDate} from './createDate';

export const getWeekDaysNames = ({firstWeekDay = 2, locale = 'en-US'}) => {
  const weekDaysNames = Array.from({length: 7});

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const {day, dayNumberInWeek, dayShort} = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[dayNumberInWeek - 1] = {day, dayShort};
  });

  return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)];
};
