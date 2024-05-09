export class Ship {
    size: number;
    coordinates: [number, number][];
    hits: number;

    constructor(size: number) {
        this.size = size;
        this.coordinates = [];
        this.hits = 0;
    }

    place(startX: number, startY: number, horizontal: boolean): void {
        this.coordinates = horizontal
            ? Array.from({ length: this.size }, (_, i) => [startX + i, startY] as [number, number])
            : Array.from({ length: this.size }, (_, i) => [startX, startY + i] as [number, number]);
    }

    hit(x: number, y: number): boolean {
        if (this.coordinates.some(coord => coord[0] === x && coord[1] === y)) {
            this.hits++;
            return true;
        }
        return false;
    }

    isSunk(): boolean {
        return this.hits === this.size;
    }
}