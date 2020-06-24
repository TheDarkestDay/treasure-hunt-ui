import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerReducer from '../player/player-slice';

export const store = configureStore({
    reducer: combineReducers({
        player: playerReducer,
    })
});