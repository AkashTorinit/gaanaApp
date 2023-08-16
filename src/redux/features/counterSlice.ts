import { combineReducers, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => null,
  },
});

const songSlice = createSlice({
  name: 'song',
  initialState: null,
  reducers: {
    setCurrentSong: (state, action) => {
      return action.payload;
    },
    clearSong: () => null,
  },
});

const allSongSlice = createSlice({
  name: 'allSongs',
  initialState: null,
  reducers: {
    setAllSongs: (state, action) => {
      return action.payload;
    },
    clearSongs: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const { setCurrentSong } = songSlice.actions;
export const { setAllSongs } = allSongSlice.actions;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  song: songSlice.reducer,
  allSongs: allSongSlice.reducer,
});

export default rootReducer;
