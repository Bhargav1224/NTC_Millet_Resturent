import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationPanel: false
};

export const applicationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    handleNotificationPanel: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // eslint-disable-next-line no-param-reassign
      state.notificationPanel = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { handleNotificationPanel } = applicationSlice.actions;

export default applicationSlice.reducer;
