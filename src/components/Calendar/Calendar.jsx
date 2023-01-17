import styles from './calendar.module.scss';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarDay from '../CalendarDay/CalendarDay';

const Calendar = ({state, functions, switchDatePicker}) => {
  return (
    <>
      <CalendarHeader switchDatePicker={switchDatePicker} functions={functions} state={state} />
      <div>
        <div className={styles.weekNames}>
          {state.weekDaysNames.map((item) => {
            return <div key={item.dayShort + Math.random() * 0.25}>{item.dayShort}</div>;
          })}
        </div>
        <div className={styles.calendarDays}>
          {state.calendarDays.map((item) => {
            return (
              <CalendarDay
                key={(item.year / Math.random()) * 0.99 + item.dayNumber}
                state={state}
                item={item}
                functions={functions}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
