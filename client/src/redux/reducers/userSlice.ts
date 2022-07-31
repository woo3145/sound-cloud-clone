import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
}

const initialState: UserState = {
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    logOut: (state) => {
      state.id = null;
    },
  },
});

export const { setUserId, logOut } = userSlice.actions;

export default userSlice.reducer;
