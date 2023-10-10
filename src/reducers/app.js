import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isDarkMode: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('isDarkMode', `${state.isDarkMode}`)
    },
    setPhotos(state, { payload }) {
      state.list = payload

    }
  },
});

export const { toggleTheme, setPhotos } = appSlice.actions;
export default appSlice.reducer;
