import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  uploadProgress: number;
}

const initialState: ProgressState = {
  uploadProgress: 0,
};

const userSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { setUploadProgress } = userSlice.actions;

export default userSlice.reducer;
