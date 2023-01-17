import {Form, Formik} from 'formik';
import styles from './eventForm.module.scss';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import dateRegex from './regularExpression/dateRegex';
import {useDispatch, useSelector} from 'react-redux';
import {addEvent, editEvent, deleteEvent} from '../../store/reducers/eventsReducer';
import {
  addEventNotLog,
  editEventNotLog,
  deleteEventNotLog,
} from '../../store/reducers/eventsReducer';
import {addInfoForEdit, switchModal} from '../../store/reducers/modalReducer';
import {ReactComponent as DeleteIcon} from './svg/delete.svg';

const EventForm = ({selectedDate, actionType, editEventInfo}) => {
  const {isServerLive, events} = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const currentDate = selectedDate.date.toLocaleDateString('eu-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const isAddForm = actionType === 'Add';
  const formName = isAddForm ? 'Add new idea item' : 'Edit idea item';

  const initialValues = {
    title: editEventInfo.title ? editEventInfo?.title : '',
    description: editEventInfo.description ? editEventInfo?.description : '',
    date: currentDate,
    time: editEventInfo.time ? editEventInfo?.time : '',
  };

  const handleSubmit = (values, actions) => {
    const d = new Date();
    const currentTime = `${d.getHours()}:${d.getMinutes()}`;

    if (!isAddForm) {
      const event = {
        ...values,
        createdTime: editEventInfo.createdTime,
        id: editEventInfo.id,
        editedTime: currentTime,
      };
      dispatch(isServerLive ? editEvent(event) : editEventNotLog(event));
    }

    if (isAddForm) {
      const idCalc = events.length === 0 ? 1 : events[events.length - 1].id + 1;
      const event = isServerLive
        ? {...values, createdTime: currentTime}
        : {...values, createdTime: currentTime, id: idCalc};
      dispatch(isServerLive ? addEvent(event) : addEventNotLog(event));
    }
    actions.resetForm();
    dispatch(switchModal());
  };

  const yupValidationSchema = yup.object().shape({
    title: yup.string().required('Field is required'),
    date: yup.string().required('Field is required ').matches(dateRegex, 'Incorrect date'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={yupValidationSchema}>
      {({dirty}) => {
        return (
          <>
            <Form className={styles.form}>
              <div>
                <div> {formName} </div>
                {!isAddForm && (
                  <div className={styles.createEditInfo}>
                    <span>
                      {' '}
                      Created at: {editEventInfo.date} {editEventInfo.createdTime}{' '}
                    </span>
                    {editEventInfo.editedTime && (
                      <span>
                        Edited at: {editEventInfo.date} {editEventInfo.editedTime}{' '}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <CustomField name="title" label="title" type="text" />
              <CustomField
                name="description"
                label="description"
                type="text"
                elementType={'textarea'}
              />
              <div className={styles.dateTimeWrapper}>
                <CustomField name="date" label="date" type="text" />
                <CustomField name="time" label="time" type="time" />
              </div>
              <div className={styles.actionButtons}>
                {!isAddForm && (
                  <div
                    onClick={() => {
                      dispatch(
                        isServerLive
                          ? deleteEvent(editEventInfo.id)
                          : deleteEventNotLog(editEventInfo.id),
                      );
                      dispatch(switchModal());
                      dispatch(addInfoForEdit({}));
                    }}>
                    <DeleteIcon />
                  </div>
                )}
                <button
                  disabled={!dirty}
                  className={dirty ? styles.buttonActive : styles.buttonDisable}
                  type={'submit'}>
                  Save
                </button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default EventForm;
