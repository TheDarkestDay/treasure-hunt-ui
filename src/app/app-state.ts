import { GameState } from '../game/game-state';
import { PlayerState } from '../player/player-state';
import { LeaderboardsState } from '../leaderboards/leaderboards-state';

export interface AppState {
    player: PlayerState;
    game: GameState;
    leaderboards: LeaderboardsState;
}