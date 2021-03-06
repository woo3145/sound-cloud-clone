import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicPlayerState {
  playList: ITrack[];
  volume: number;
  isPlaying: boolean;
  currentTrackIdx: number | null;
  currentTrack: ITrack | null;
}

const initialState: MusicPlayerState = {
  playList: [],
  volume: 100,
  isPlaying: false,
  currentTrackIdx: null,
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
      state.playList.filter((d, idx) => idx === state.currentTrackIdx);
      state.currentTrackIdx = 0;
    },
    setCollection: (
      state,
      { payload }: PayloadAction<{ tracks: ITrack[]; idx: number }>
    ) => {
      state.playList = payload.tracks;
      state.currentTrackIdx = payload.idx;
      state.currentTrack = payload.tracks[payload.idx];
      state.isPlaying = true;
    },
    prevTrack: (state) => {
      if (state.currentTrackIdx === null || state.playList.length === 0) {
        return;
      }
      state.isPlaying = true;
      // 이전 트랙이 없으면 스탑
      if (state.currentTrackIdx < 1) {
        state.isPlaying = false;
        return;
      }
      // 있으면 다음곡으로
      state.currentTrackIdx = state.currentTrackIdx - 1;
      state.currentTrack = state.playList[state.currentTrackIdx];
    },
    nextTrack: (state) => {
      if (state.currentTrackIdx === null || state.playList.length === 0) {
        return;
      }
      // 다음 트랙이 없으면 정지
      if (state.currentTrackIdx >= state.playList.length - 1) {
        state.isPlaying = false;
        return;
      }
      // 있으면 다음곡으로
      state.currentTrackIdx = state.currentTrackIdx + 1;
      state.currentTrack = state.playList[state.currentTrackIdx];
    },
    playToggle: (state) => {
      //   if (!state.currentTrack) {
      //     return;
      //   }
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { clear, setCollection, prevTrack, nextTrack, playToggle } =
  musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
