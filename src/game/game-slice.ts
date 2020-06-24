import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GameState } from './game-state';
import { AppState } from '../app/app-state';
import { Point, RevealedCell } from '../domain';
import { treasureHuntApi } from '../treasure-hunt-api';

const initialState: GameState = {
    pointsToReveal: [],
    revealedPoints: [],
    errorMessage: '',
    turnsTaken: 0,
};

export const fetchPoints = createAsyncThunk<RevealedCell[], Point[], {state: AppState}>(
    'game/fetchPointsStatus',
    async (points, thunkApi) => {
        const {sessionId} = thunkApi.getState().player;

        const results = await treasureHuntApi.checkFields(sessionId, points);

        return results;
    }
);

export const addPoint = createAsyncThunk<void, Point, {state: AppState}>(
    'game/addPointStatus', 
    async (point, thunkApi) => {
        const currentlyAddedPoints = thunkApi.getState().game.pointsToReveal;

        if (currentlyAddedPoints.length === 2) {
            thunkApi.dispatch(fetchPoints(currentlyAddedPoints.concat(point)));
        } else {
            thunkApi.dispatch(pointAdded(point));
        }
    }
);

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        pointAdded(state, action) {
            state.pointsToReveal.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPoints.pending, (state) => {
            state.pointsToReveal = [];
        });
        builder.addCase(fetchPoints.fulfilled, (state, action) => {
            state.revealedPoints.push(...action.payload);
            state.turnsTaken += 1;
        });
    }
});

export const { pointAdded } = gameSlice.actions;

export default gameSlice.reducer;