import styles from './DatePickerMonths.module.scss';

const DatePickerMonths = ({state, functions}) => {
  return (
    <div className={styles.calendarPickItemsContainer}>
      {state.monthsNames.map((monthName) => {
        const isCurrentMonth =
          new Date().getMonth() === monthName.monthIndex &&
          state.selectedYear === new Date().getFullYear();
        const isSelectedMonth = monthName.monthIndex === state.selectedMonth.monthIndex;

        return (
          <div
            key={monthName.month + Math.random() * 0.25}
            onClick={() => functions.selectCalendarMonth(monthName.monthIndex)}
            className={[
              styles.calendarPickItem,
              isSelectedMonth ? styles.calendarSelectedItem : '',
              isCurrentMonth ? styles.calendarTodayItem : '',
            ].join(' ')}>
            {monthName.monthShort}
          </div>
        );
      })}
    </div>
  );
};

export default DatePickerMonths;
