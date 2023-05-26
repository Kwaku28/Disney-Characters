import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const initialState = {
  profile: [],
  status: 'idle',
  error: null,
  Loading: false,
};

const URL = 'https://api.disneyapi.dev/character';

export const getCharacterProfile = createAsyncThunk(
  'profile/getCharacterProfile',
  async (id) => {
    const res = await fetch(`${URL}/${id}`);
    const response = await res.json();
    return response;
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
        state.Loading = true;
      })
      .addCase(getCharacterProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.data;
        state.loading = false;
      })
      .addCase(getCharacterProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
