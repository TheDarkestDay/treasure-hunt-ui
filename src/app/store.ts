import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerReducer from '../player/player-slice';
import gameReducer from '../game/game-slice';

export const store = configureStore({
    reducer: combineReducers({
        player: playerReducer,
        game: gameReducer,
    })
});