import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('auth_user')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isAuthenticated: !!initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_user');
    }
  }
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;