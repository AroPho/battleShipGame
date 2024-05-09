import { Player } from "./player";
import { Board } from "./board";

export class Game {
  player1: Player;
  player2: Player;
  currentTurn: string;
  board1: Board;
  board2: Board;
  status: string;
  winner: string;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentTurn = player1.username;
    this.board1 = new Board();
    this.board2 = new Board();
    this.status = "ongoing";
    this.winner = "none";
  }

  switchTurn(): void {
    this.currentTurn =
      this.currentTurn === this.player1.username
        ? this.player2.username
        : this.player1.username;
  }

  placeShip(
    player: string,
    shipSize: number,
    startX: number,
    startY: number,
    horizontal: boolean
  ): string {
    const board = player === this.player1.username ? this.board1 : this.board2;
    return board.addShip(shipSize, startX, startY, horizontal);
  }

  attack(player: string, x: number, y: number): string {
    if (this.status === "finished") {
      return "Game is already over";
    }

    if (player !== this.currentTurn) {
      return "Not your turn";
    }
    const board = player === this.player1.username ? this.board2 : this.board1;
    const result = board.attack(x, y);
    if (result !== "Already attacked") {
      this.switchTurn();
      // Check if the attack resulted in a win
      if (result === "Sunk") {
        const winner = this.gameFinished();
        if (winner) {
          return `${result}, ${winner} wins!`;
        }
      }
    }
    return result;
  }

  gameFinished(): string | null {
    if (this.board1.ships.every((ship) => ship.isSunk())) {
      this.status = "finished";
      this.winner = this.player2.username;
      this.player2.winCount++;
      this.player1.lossCount++;
      return this.player2.username;
    }
    if (this.board2.ships.every((ship) => ship.isSunk())) {
      this.status = "finished";
      this.winner = this.player1.username;
      this.player1.winCount++;
      this.player2.lossCount++;
      return this.player1.username;
    }
    return null;
  }
}
