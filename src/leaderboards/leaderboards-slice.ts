import { LeaderboardsState } from './leaderboards-state';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { treasureHuntApi } from '../treasure-hunt-api';

const initialState: LeaderboardsState = {
    entries: [],
    isLoading: false,
    errorMessage: ''
};

export const fetchLeaderboards = createAsyncThunk(
    'leaderboards/fetchLeaderboardsStatus',
    async () => {
        const leaderboards = await treasureHuntApi.getLeaderboards();
        return leaderboards;
    }
);

const leaderboardsSlice = createSlice({
    name: 'leaderboards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLeaderboards.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeaderboards.fulfilled, (state, action) => {
            state.entries = action.payload;
        });
        builder.addCase(fetchLeaderboards.rejected, (state, action) => {
            state.errorMessage = action.error.message || 'Something went wrong';
        });
    }
});

export default leaderboardsSlice.reducer;