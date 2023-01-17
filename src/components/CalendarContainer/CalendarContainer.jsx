import Calendar from '../Calendar/Calendar';
import DatePicker from '../DatePicker/DatePicker';
import Modal from '../Modal/Modal';
import {useEffect, useState} from 'react';
import {useCalendar} from '../../hooks/useCalendar';
import {getFromLS, saveToLS} from '../../functions/localStorage';
import {createMonth} from '../../functions/createMonth';
import {useDispatch, useSelector} from 'react-redux';
import {getEvents} from '../../store/reducers/eventsReducer';

const CalendarContainer = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {events} = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const {state, functions} = useCalendar({
    locale: 'en-US',
    date: new Date(),
    firstWeekDayNumber: 2,
  });

  useEffect(() => {
    events.length > 0 && saveToLS('events', events);
  }, [events]);

  useEffect(() => {
    if (getFromLS('dateFilterInfo')) {
      const monthIndex = getFromLS('dateFilterInfo').monthIndex;
      const year = getFromLS('dateFilterInfo').year;
      functions.setSelectedMonth(createMonth({date: new Date(year, monthIndex), locale: 'en-US'}));
      functions.setSelectedYear(year);
    }
    (async () => {
      try {
        await dispatch(getEvents());
      } catch (e) {
        console.error(e);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.calendarDays) {
      saveToLS('dateFilterInfo', state.selectedMonth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.calendarDays]);

  const switchDatePicker = () => setIsDatePickerOpen((prev) => !prev);

  return (
    <>
      <Calendar switchDatePicker={switchDatePicker} state={state} functions={functions} />
      <DatePicker
        state={state}
        functions={functions}
        switchDatePicker={switchDatePicker}
        isDatePickerOpen={isDatePickerOpen}
      />
      <Modal state={state} functions={functions} />
    </>
  );
};

export default CalendarContainer;
