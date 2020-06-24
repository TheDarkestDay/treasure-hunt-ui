import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { treasureHuntApi } from '../treasure-hunt-api';
import history from '../history';
import { PlayerState } from './player-state';

const initialState: PlayerState = {
    isLoading: false,
    errorMessage: '',
    sessionId: '',
};

export const createNewGame = createAsyncThunk(
    'newPlayer/createGameStatus',
    async (name: string) => {
        const sessionId = await treasureHuntApi.createGame(name);
        history.push('/game');
        return sessionId;
    }
);

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(createNewGame.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createNewGame.fulfilled, (state, action) => {
            state.sessionId = action.payload;
            state.isLoading = false;
        });
        builder.addCase(createNewGame.rejected, (state, action) => {
            state.errorMessage = action.error.message || 'Something went wrong';
            state.isLoading = false;
        });
    }
});

export default playerSlice.reducer;