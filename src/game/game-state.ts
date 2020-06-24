import { Point, RevealedCell } from '../domain';

export interface GameState {
    pointsToReveal: Point[];
    revealedPoints: RevealedCell[];
    errorMessage: string;
    turnsTaken: number;
}