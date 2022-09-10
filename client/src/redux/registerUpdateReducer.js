import { createSlice } from "@reduxjs/toolkit";

const registerUpdateSlice = createSlice({
  name: "registerUpdate",
  initialState: {
    isRegisterUpdateOpen: false
  },
  reducers: {
    openBox: (state) => {
      state.isRegisterUpdateOpen = true;
    },
    closeBox: (state) => {
      state.isRegisterUpdateOpen = false;
    }
  }
});

export const {
  openBox,
  closeBox
} = registerUpdateSlice.actions;
export default registerUpdateSlice.reducer;