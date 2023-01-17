import styles from './calendarHeader.module.scss';
import {ReactComponent as AddIcon} from '../Calendar/svg/addIcon.svg';
import {addModalType, switchModal} from '../../store/reducers/modalReducer';
import {ReactComponent as Arrow} from './svg/arrow.svg';
import {ReactComponent as DatePickerIcon} from '../Calendar/svg/datePicker.svg';
import {useDispatch} from 'react-redux';

const CalendarHeader = ({switchDatePicker, functions, state}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      <AddIcon
        onClick={() => {
          dispatch(addModalType('Add'));
          dispatch(switchModal());
        }}
        className={styles.addIcon}
      />
      <div className={styles.dateWrapper}>
        <div className={styles.date}>
          <Arrow onClick={() => functions.onClickArrow('left')} className={styles.arrowLeft} />
          <div>
            {state.monthsNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
          <Arrow onClick={() => functions.onClickArrow('right')} className={styles.arrowRight} />
        </div>
        <DatePickerIcon className={styles.datePicker} onClick={() => switchDatePicker()} />
      </div>
    </div>
  );
};

export default CalendarHeader;
