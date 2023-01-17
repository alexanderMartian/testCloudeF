import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  actionType: '',
  editEventInfo: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    switchModal(state) {
      state.isActive = !state.isActive;
    },
    addInfoForEdit(state, payload) {
      state.editEventInfo = payload.payload;
    },
    addModalType(state, payload) {
      state.actionType = payload.payload;
    },
  },
});

export default modalSlice.reducer;
export const {switchModal, addInfoForEdit, addModalType} = modalSlice.actions;
