import { Game } from "./game";

export class Player {
    username: string;
    winCount: number;
    lossCount: number;
    gamesPlayed: string[];

    constructor(username: string) {
        this.username = username;
        this.winCount = 0;
        this.lossCount = 0;
        this.gamesPlayed = [];
    }
}