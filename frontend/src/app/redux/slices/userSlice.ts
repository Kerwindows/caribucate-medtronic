// src/app/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/auth.api'
import type { RootState } from '../store'

interface UserState {
  data: null | any // Replace 'any' with your user type
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/verify_token', { // Use the api instance
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  }
})

export const { clearUserData } = userSlice.actions
export default userSlice.reducer