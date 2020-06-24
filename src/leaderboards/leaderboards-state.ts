import { LeaderboardsEntry } from '../domain';

export interface LeaderboardsState {
    entries: LeaderboardsEntry[];
    isLoading: boolean;
    errorMessage: string;
}