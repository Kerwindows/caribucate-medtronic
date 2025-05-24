// src/app/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/auth.api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/verify_token');
      return { token, user: response.data.user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Authentication failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        localStorage.removeItem('token');
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;