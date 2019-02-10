import { clone, isEqual } from 'lodash';

export type Tile = number|null;
export type Row = Array<Tile>;
export type Rows = Array<Row>;
export interface GameState {
  tiles: Rows
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
  private onChangeCallback: Function = () => {}
  private onEndCallback: Function = () => {}
  private state: GameState
  private emptyPosition: Coordinate

  static solutionRows: Rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ]

  public onChange(cb: Function): void {
    this.onChangeCallback = cb;
  }

  public onEnd(cb: Function): void {
    this.onEndCallback = cb;
  }

  public getEmptyCoordinate(): Coordinate {
    return clone(this.emptyPosition);
  }

  public moveUp(): void {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyRow === 3) return;
    this.move([emptyRow + 1, emptyCol]);
  }

  public moveDown(): void {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyRow === 0) return;
    this.move([emptyRow - 1, emptyCol]);
  }

  public moveRight(): void {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyCol === 0) return;
    this.move([emptyRow, emptyCol - 1]);
  }

  public moveLeft(): void {
    const [emptyRow, emptyCol] = this.emptyPosition;
    if (emptyCol === 3) return;
    this.move([emptyRow, emptyCol + 1]);
  }

  private move(newEmptyPosition: Coordinate): void {
    this.swapEmptyPositions(this.emptyPosition, newEmptyPosition);
    this.onChangeCallback();
    this.checkIfEnded();
  }

  private checkIfEnded(): void {
    if (!this.isBoardCompleted()) return;

    this.onEndCallback();
  }

  private isBoardCompleted(): boolean {
    if (this.emptyPosition[0] !== 3 || this.emptyPosition[1] !== 3) {
      return false;
    }
    return isEqual(this.state.tiles, Game.solutionRows);
  }

  private swapEmptyPositions(
    oldPosition: Coordinate, newPosition: Coordinate): void {
    this.swap(oldPosition, newPosition);
    this.emptyPosition = newPosition;
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
