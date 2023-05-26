/* eslint-disable no-underscore-dangle */
import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

export const initialState = {
  characters: [],
  status: 'idle',
  error: null,
  loading: false,
};

const URL = 'https://api.disneyapi.dev/character';

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async () => {
    try {
      const res = await fetch(URL);
      const response = await res.json();
      return response;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  },
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.data.map((character) => ({
          id: character._id,
          name: character.name,
          characterImage: character.imageUrl,
        }));
        state.loading = false;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
