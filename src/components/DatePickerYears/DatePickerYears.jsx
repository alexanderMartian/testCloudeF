import styles from './datePickerYears.module.scss';

const DatePickerYears = ({state, functions}) => {
  return (
    <div className={styles.calendarPickItemsContainer}>
      <div className={styles.calendarNoChooseYear}>{state.selectedYearsInterval[0] - 1}</div>

      {state.selectedYearsInterval.map((year) => {
        const isCurrentYear = new Date().getFullYear() === year;
        const isSelectedYear = year === state.selectedYear;

        return (
          <div
            key={year + Math.random() * 0.25}
            onClick={() => {
              functions.selectCalendarYear(year);
              functions.setSelectedYear(year);
            }}
            className={[
              styles.calendarPickItem,
              isCurrentYear ? styles.calendarSelectedItem : '',
              isSelectedYear ? styles.calendarTodayItem : '',
            ].join(' ')}>
            {year}
          </div>
        );
      })}

      <div className={styles.calendarNoChooseYear}>
        {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
      </div>
    </div>
  );
};

export default DatePickerYears;
