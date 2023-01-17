import styles from './modal.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import EventForm from '../EventForm/EventForm';
import {switchModal, addInfoForEdit} from '../../store/reducers/modalReducer';

const Modal = ({state}) => {
  const {isActive, actionType, editEventInfo} = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (isActive) {
    return (
      <div className={styles.root}>
        <div
          onClick={() => {
            dispatch(switchModal());
            dispatch(addInfoForEdit({}));
          }}
          className={styles.background}
        />
        <EventForm
          actionType={actionType}
          selectedDate={state.selectedDate}
          editEventInfo={editEventInfo}
        />
      </div>
    );
  }
};

export default Modal;
