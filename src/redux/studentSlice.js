import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action) => {
      state.value = state.value.filter((value) => {
        return value.id != action.payload;
      });
    },
    clear: (state, action) => {
      state.value = [];
    },
    update: (state, action) => {
      state.value = state.value.map((value) => {
        if (value.id == action.payload.id) {
          value = action.payload;
        }
        return value;
      });
    },
    updateName: (state, action) => {
      state.value = state.value.map((value) => {
        if (value.id == action.payload.id) {
          value.name = action.payload.name;
        }
        return value;
      });
    },
    updateAge: (state, action) => {
      state.value = state.value.map((value) => {
        if (value.id == action.payload.id) {
          value.age = action.payload.age;
        }
        return value;
      });
    },
  },
});
export const { add, remove, clear, update, updateName, updateAge } =
  studentSlice.actions;
export default studentSlice.reducer;
