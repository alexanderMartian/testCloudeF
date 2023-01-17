import styles from './calendarDay.module.scss';
import {useSelector} from 'react-redux';
import {checkIsToday} from '../../functions/checkIsToday';
import {checkDateIsEqual} from '../../functions/checkDateIsEqual';
import CalendarEvent from '../CalendarEvent/CalendarEvent';

const CalendarDay = ({state, item, functions}) => {
  const {events} = useSelector((state) => state.events);

  const isToday = checkIsToday(item.date);
  const isSelectedDay = checkDateIsEqual(item.date, state.selectedDate.date);
  const isAdditionalDay = item.monthIndex !== state.selectedMonth.monthIndex;
  const dayStyles = [
    styles.calendarDaysItem,
    isToday ? styles.calendarToday : '',
    isSelectedDay ? styles.calendarSelected : '',
    isAdditionalDay ? styles.calendarAdditional : '',
  ].join(' ');

  const currentDay = item.date.toLocaleDateString('eu-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const event = events.filter((item) => item.date === currentDay);

  return (
    <div className={dayStyles} onClick={() => functions.setSelectedDate(item)}>
      <div className={styles.dayNameNumber}>
        <div>{item.dayNumber}</div>
        <div>{item.dayShort}</div>
      </div>
      <div className={styles.eventWrapper}>
        {event.map((item, index) => {
          if (index >= 3) {
            return null;
          }
          return <CalendarEvent key={item.id * Math.random() * 0.12} item={item} />;
        })}
        {event.length > 3 && <span>more...</span>}
      </div>
    </div>
  );
};

export default CalendarDay;
