import { Ship } from "./ship";

export class Board {
    ships: Ship[];
    hits: Set<string>;
    misses: Set<string>;
    shipSizes: Map<number, number>;

    constructor() {
        this.ships = [];
        this.hits = new Set();
        this.misses = new Set();
        this.shipSizes = new Map([
            [5, 1], // One ship of size 5
            [4, 2], // Two ships of size 4
            [3, 1], // One ship of size 3
            [2, 1]  // One ship of size 2
        ]);
    }

    addShip(shipSize: number, startX: number, startY: number, horizontal: boolean): string {
        if(startX > 10 || startY > 10 || startX < 1 || startY < 1) {
            return "Ship is out of bounds";
        }
    
        const ship = new Ship(shipSize);

        if (!this.shipSizes.has(ship.size)) {
            return "Invalid ship size";
        }

        // Get the allowed count of ships of the same size
        const allowedCount = this.shipSizes.get(ship.size) || 0;
        
        // Count the number of ships of the same size already on the board
        const currentCount = this.ships.filter(s => s.size === ship.size).length;

        if (currentCount >= allowedCount) {
            return "Ship limit for this size reached";
        }

        ship.place(startX, startY, horizontal);
        this.ships.push(ship);
        return "Ship added successfully";
    }

    attack(x: number, y: number): string {
        const coordKey = `${x},${y}`;
        if (this.hits.has(coordKey) || this.misses.has(coordKey)) {
            return "Already attacked";
        }
        for (const ship of this.ships) {
            if (ship.hit(x, y)) {
                this.hits.add(coordKey);
                return ship.isSunk() ? "Sunk" : "Hit";
            }
        }
        this.misses.add(coordKey);
        return "Miss";
    }
}