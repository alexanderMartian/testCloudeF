import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './reducers/modalReducer';
import eventsReducer from './reducers/eventsReducer';

export default configureStore({
  reducer: {
    modal: modalReducer,
    events: eventsReducer,
  },
});
