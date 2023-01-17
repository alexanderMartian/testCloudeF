import styles from './calendarEvent.module.scss';
import {addInfoForEdit, addModalType, switchModal} from '../../store/reducers/modalReducer';
import {useDispatch} from 'react-redux';

const CalendarEvent = ({item}) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.event}
      onClick={() => {
        dispatch(switchModal());
        dispatch(addModalType('Edit'));
        dispatch(addInfoForEdit(item));
      }}>
      {item.title}
    </div>
  );
};

export default CalendarEvent;
