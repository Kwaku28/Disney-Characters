/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profile: [],
  status: 'idle',
  isLoading: false,
};

const URL = 'https://api.disneyapi.dev/character';

export const getCharacterProfile = createAsyncThunk(
  'profile/getCharacterProfile',
  async (id) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCharacterProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.data;
      })
      .addCase(getCharacterProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
