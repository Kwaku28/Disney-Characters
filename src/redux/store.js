import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './characters/charactersSlice';
import profileReducer from './profile/profileSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    profile: profileReducer,
  },
});

export default store;
