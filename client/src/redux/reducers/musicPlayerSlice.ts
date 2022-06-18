import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../mockData/useMockTracks";

interface MusicPlayerState {
  playList: Track[];
  volume: number;
  isPlaying: boolean;
  currentTrackId: number | null;
  currentTrack: Track | null;
}

const initialState: MusicPlayerState = {
  playList: [],
  volume: 100,
  isPlaying: false,
  currentTrackId: null,
  currentTrack: null,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    clear: (state) => {
      if (state.playList.length <= 1) {
        return;
      }
      state.playList.filter((d, idx) => idx === state.currentTrackId);
      state.currentTrackId = 0;
    },
    setCollection: (
      state,
      { payload }: PayloadAction<{ collection: Track[]; idx: number }>
    ) => {
      state.playList = payload.collection;
      state.currentTrackId = payload.idx;
      state.currentTrack = state.playList[payload.idx];
    },
    prevTrack: (state) => {
      if (!state.currentTrackId || state.playList.length === 0) {
        return;
      }
      // 이전 트랙이 없으면 재시작
      if (state.currentTrackId < 1) {
        state.isPlaying = true;
        return;
      }
      // 있으면 다음곡으로
      state.currentTrackId = state.currentTrackId -= 1;
      state.currentTrack = state.playList[state.currentTrackId];
    },
    nextTrack: (state) => {
      if (!state.currentTrackId || state.playList.length === 0) {
        return;
      }
      // 다음 트랙이 없으면 정지
      if (state.currentTrackId >= state.playList.length - 1) {
        state.isPlaying = false;
        return;
      }
      // 있으면 다음곡으로
      state.currentTrackId = state.currentTrackId += 1;
      state.currentTrack = state.playList[state.currentTrackId];
    },
  },
});

export const {} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
