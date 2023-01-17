import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getData, addData, editData, deleteData} from '../../api/events';
import {getFromLS} from '../../functions/localStorage';

export const getEvents = createAsyncThunk('events/get', async () => await getData());
export const addEvent = createAsyncThunk('events/add', async (event) => await addData(event));
export const editEvent = createAsyncThunk('events/edit', async (event) => await editData(event));
export const deleteEvent = createAsyncThunk('events/delete', async (id) => await deleteData(id));

const initialState = {
  events: [],
  isServerLive: true,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEventNotLog(state, payload) {
      state.events.push(payload.payload);
    },
    editEventNotLog(state, payload) {
      const index = state.events.findIndex((item) => item.id === payload.payload.id);
      state.events[index] = payload.payload;
    },
    deleteEventNotLog(state, payload) {
      state.events = state.events.filter((item) => item.id !== payload.payload);
    },
  },
  extraReducers: {
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
    [getEvents.rejected]: (state) => {
      state.isServerLive = false;
      state.events = getFromLS('events') ? getFromLS('events') : [];
    },
    [addEvent.fulfilled]: (state, action) => {
      state.events.push(action.payload);
    },
    [editEvent.fulfilled]: (state, action) => {
      const index = state.events.findIndex((item) => item.id === action.payload.id);
      state.events[index] = action.payload;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.events = state.events.filter((item) => item.id !== action.payload);
    },
  },
});

export const {addEventNotLog, editEventNotLog, deleteEventNotLog} = eventSlice.actions;
export default eventSlice.reducer;
