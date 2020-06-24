export interface Point {
    x: number;
    y: number;
}

export interface RevealedCell {
    x: number;
    y: number;
    content: string;
}

export interface LeaderboardsEntry {
    name: string;
    score: number;
}