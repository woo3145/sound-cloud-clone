import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import musicPlayerSlice from "./reducers/musicPlayerSlice";
import progressSlice from "./reducers/progressSlice";
import userSlice from "./reducers/userSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userSlice,
    musicPlayer: musicPlayerSlice,
    progress: progressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
