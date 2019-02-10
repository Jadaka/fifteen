import { clone } from 'lodash';

export type Tile = number|null;
export interface GameState {
  tiles: Array<Array<Tile>>
}
export type Coordinate = Array<number>

/**
 * Game class
 *
 * An instance of game holds the state for one single game.
 */
class Game {
  constructor(defaultState: GameState) {
    this.state = defaultState;
    this.emptyPosition = this.findEmptyCoordinates();
  }
  private state: GameState
  private emptyPosition: Coordinate

  public getEmptyCoordinates() {
    return clone(this.emptyPosition);
  }

  public moveUp(): boolean {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyRow === 3) return false;

    const newEmptyPosition = [emptyRow + 1, emptyCol];
    this.swap(newEmptyPosition, this.emptyPosition);
    this.emptyPosition = newEmptyPosition;
    return true;
  }

  public moveDown(): boolean {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyRow === 0) return false;

    const newEmptyPosition = [emptyRow - 1, emptyCol];
    this.swap(newEmptyPosition, this.emptyPosition);
    this.emptyPosition = newEmptyPosition;
    return true;
  }

  public moveRight(): boolean {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyCol === 0) return false;

    const newEmptyPosition = [emptyRow, emptyCol - 1];
    this.swap(newEmptyPosition, this.emptyPosition);
    this.emptyPosition = newEmptyPosition;
    return true;
  }

  public moveLeft(): boolean {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyCol === 3) return false;

    const newEmptyPosition = [emptyRow, emptyCol + 1];
    this.swap(newEmptyPosition, this.emptyPosition);
    this.emptyPosition = newEmptyPosition;
    return true;
  }

  private swap(a: Coordinate, b: Coordinate): void {
    const tmp: Tile = this.getValue(a);
    this.setValue(a, this.getValue(b));
    this.setValue(b, tmp);
  }

  private getValue([row, col]: Coordinate): Tile {
    return this.state.tiles[row][col];
  }

  private setValue([row, col]: Coordinate, value: Tile): void {
    this.state.tiles[row][col] = value;
  }

  private findEmptyCoordinates(): Coordinate {
    const { tiles } = this.state;
    for (let i: number = 0; i < tiles.length; i++) {
      for (let j: number = 0; j < tiles[0].length; j++) {
        if (tiles[i][j] === null) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }
}

export default Game;
