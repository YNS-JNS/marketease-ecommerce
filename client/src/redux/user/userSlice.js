import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ____________________ Sign in actions ____________________
    // initial action
    signInStart: (state) => {
      state.loading = true;
    },
    // Success actions
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Failure actions
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // ____________________  Update user actions ____________________
    // initial action
    updateUserStart: (state) => {
      state.loading = true;
    },
    // Success actions
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Failure actions
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // ____________________  Delete user actions ____________________
    // initial action
    deleteUserStart: (state) => {
      state.loading = true;
    },
    // Success actions
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // Failure actions
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // ____________________  Sign out actions ____________________
    // initial action
    signOutUserStart: (state) => {
      state.loading = true;
    },
    // Success actions
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // Failure actions
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;
