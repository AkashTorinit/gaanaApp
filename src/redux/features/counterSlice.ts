import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: 'user',
  initialState: null, // or an initial state structure for user data
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Set the user data in the state
    },
    clearUser: () => null, // Clear the user data from state
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
