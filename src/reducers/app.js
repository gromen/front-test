import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isDarkMode: false,
  isLoading: false,
  pageCurrent: 0
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
      state.list = [...state.list, payload]
    },
    setIsLoading(state, { payload }) {
      if (typeof payload !== "boolean" ) {
        throw new Error('Payload has to be boolean value')
      }

      state.isLoading = payload;
    },
    incrementPage(state) {
      state.pageCurrent += 30
    }
  },
});

export const {
  toggleTheme,
  setPhotos,
  setIsLoading,
  incrementPage
} = appSlice.actions;
export default appSlice.reducer;
