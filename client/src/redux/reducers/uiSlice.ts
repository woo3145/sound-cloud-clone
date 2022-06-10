import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  userDropdownVisible: boolean;
  moreDropdownVisible: boolean;
  notificationDropdownVisible: boolean;
  messageDropdownVisible: boolean;
}

const initialState: UiState = {
  userDropdownVisible: false,
  moreDropdownVisible: false,
  notificationDropdownVisible: false,
  messageDropdownVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    userDropdownToggle: (state) => {
      state.userDropdownVisible = !state.userDropdownVisible;
      state.moreDropdownVisible = false;
      state.notificationDropdownVisible = false;
      state.messageDropdownVisible = false;
    },
    moreDropdownToggle: (state) => {
      state.userDropdownVisible = false;
      state.moreDropdownVisible = !state.moreDropdownVisible;
      state.notificationDropdownVisible = false;
      state.messageDropdownVisible = false;
    },
    notificationDropdownToggle: (state) => {
      state.userDropdownVisible = false;
      state.moreDropdownVisible = false;
      state.notificationDropdownVisible = !state.notificationDropdownVisible;
      state.messageDropdownVisible = false;
    },
    messageDropdownToggle: (state) => {
      state.userDropdownVisible = false;
      state.moreDropdownVisible = false;
      state.notificationDropdownVisible = false;
      state.messageDropdownVisible = !state.messageDropdownVisible;
    },
    allDropdownClose: (state) => {
      state.userDropdownVisible = false;
      state.moreDropdownVisible = false;
      state.notificationDropdownVisible = false;
      state.messageDropdownVisible = false;
    },
  },
});

export const { userDropdownToggle, moreDropdownToggle } = uiSlice.actions;

export default uiSlice.reducer;
