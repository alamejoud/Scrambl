export interface Stats {
    timesPlayed: number;
    timesWon: number;
    currentStreak: number;
    bestStreak: number;
    totalStats: Array<{ guess: number; times: number }>;
}