import styles from './datePicker.module.scss';
import {useState} from 'react';
import DatePickerMonths from '../DatePickerMonths/DatePickerMonths';
import DatePickerYears from '../DatePickerYears/DatePickerYears';
import {ReactComponent as CloseIcon} from './svg/close.svg';

const DatePicker = ({state, functions, switchDatePicker, isDatePickerOpen}) => {
  const [datePickerName, setDatePickerName] = useState('Months');

  const content = () => {
    if (datePickerName === 'Months') {
      return <DatePickerMonths state={state} functions={functions} />;
    }
    if (datePickerName === 'Years') {
      return <DatePickerYears state={state} functions={functions} />;
    }
  };

  if (isDatePickerOpen) {
    return (
      <div className={styles.mainWrapper}>
        <div onClick={() => switchDatePicker()} className={styles.closeElement}>
          <CloseIcon />
        </div>
        <div className={styles.pickerHeader}>
          <div
            className={datePickerName === 'Months' ? styles.pickerActive : ''}
            onClick={() => setDatePickerName('Months')}>
            {state.monthsNames[state.selectedMonth.monthIndex].month}
          </div>
          <div
            className={datePickerName === 'Years' ? styles.pickerActive : ''}
            onClick={() => setDatePickerName('Years')}>
            {state.selectedYear}
          </div>
        </div>
        {content()}
      </div>
    );
  }
};

export default DatePicker;
