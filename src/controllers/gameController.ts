import { Game } from '../gameObjects/game';
import { Player } from '../gameObjects/player';
import { Request, Response } from 'express';

// A simple in-memory store for games, keyed by a game ID
const games: { [key: string]: Game } = {};
// A simple in-memory store for players, keyed by a player ID
const players: { [key: string]: Player } = {};

// Helper function to generate a unique game ID
function generateGameId(): string {
    return Math.random().toString(36).substring(2, 9);
}

export const createGame = (req: Request, res: Response) => {
    const { player1Name, player2Name } = req.body;

    // Check if players already exist or create new ones
    const player1 = players[player1Name] || new Player(player1Name);
    const player2 = players[player2Name] || new Player(player2Name);

    // Save new players to the registry if they were not already there
    if (!players[player1Name]) players[player1Name] = player1;
    if (!players[player2Name]) players[player2Name] = player2;
    
    const gameId = generateGameId();
    const newGame = new Game(player1, player2);
    games[gameId] = newGame;
    player1.gamesPlayed.push(gameId);
    player2.gamesPlayed.push(gameId);
    res.status(201).send({ message: 'Game created', gameId });
};

export const placeShip = (req: Request, res: Response) => {
    const { gameId, player, shipSize, startX, startY, horizontal } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).send('Game not found');
    }
    const result = game.placeShip(player, shipSize, startX, startY, horizontal);
    res.status(200).send(result);
};

export const attack = (req: Request, res: Response) => {
    const { gameId, player, x, y } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).send('Game not found');
    }
    const result = game.attack(player, x, y);
    res.status(200).send(result);
};

export const checkGameStatus = (req: Request, res: Response) => {
    const { gameId } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).send('Game not found');
    }
    const status = game.checkWinner();
    res.status(200).send({ status: game.status, winner: status });
};