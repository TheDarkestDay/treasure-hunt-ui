import { GameState } from '../game/game-state';
import { PlayerState } from '../player/player-state';

export interface AppState {
    player: PlayerState;
    game: GameState;
}