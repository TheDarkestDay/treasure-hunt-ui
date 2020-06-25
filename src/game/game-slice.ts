import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GameState } from './game-state';
import { AppState } from '../app/app-state';
import { Point, RevealedCell } from '../domain';
import { treasureHuntApi } from '../treasure-hunt-api';
import { sessionCleared } from '../player/player-slice';

const initialState: GameState = {
    pointsToReveal: [],
    revealedPoints: [],
    errorMessage: '',
    turnsTaken: 0,
};

const CELLS_PER_TURN = 3;
const TOTAL_CELLS_COUNT = 25;

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
        const revealedPointsCount = thunkApi.getState().game.revealedPoints.length;
        const addedPointsThreshold = revealedPointsCount + CELLS_PER_TURN > TOTAL_CELLS_COUNT 
            ? TOTAL_CELLS_COUNT % CELLS_PER_TURN
            : CELLS_PER_TURN;

        if (currentlyAddedPoints.length + 1 === addedPointsThreshold) {
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
        builder.addCase(sessionCleared, () => {
            return initialState;
        });
    }
});

export const { pointAdded } = gameSlice.actions;

export default gameSlice.reducer;