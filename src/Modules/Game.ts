import { clone, isEqual, range, shuffle, chunk, flatten } from 'lodash';

export type Tile = number;
export type Row = Array<Tile>;
export type Rows = Array<Row>;
export interface GameState {
  rows: Rows
}
export type Coordinate = Array<number>

/**
 * Game class
 *
 * An instance of game holds the state for one single game.
 */
class Game {
  constructor(initialRows?: Rows) {
    this.state = {
      rows: initialRows || Game.generateRandomRows(),
    }
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
    [13, 14, 15, 0],
  ]

  static generateRandomRows(): Rows {
    let values: Array<Tile> = range(0, 16); // 16 non-inclusive
    // Shuffles and groups into subarrays of length 4.
    return chunk(shuffle(values), 4);
  }

  /**
   * isSolvable
   *
   * Given a 2-d rows array, detects whether a board is solvable.
   *
   * @url https://goo.gl/dowZx3
   */
  static isSolvable(rows: Rows): boolean {
    const flatRows: Array<Tile> = flatten(rows);
    let parity: number = 0;
    let gridWidth: number = Math.sqrt(flatRows.length);
    let row: number = 0; // the current row we are on
    let blankRow: number = 0; // the row with the blank tile

    for (let i = 0; i < flatRows.length; i++) {
      if (i % gridWidth === 0) { // advance to next row
        row++;
      }
      if (flatRows[i] === 0) { // the blank tile
        blankRow = row; // save the row on which encountered
        continue;
      }
      for (let j = i + 1; j < flatRows.length; j++){
        if (flatRows[i] > flatRows[j] && flatRows[j] != 0) {
            parity++;
        }
      }
    }

    if (gridWidth % 2 == 0) { // even grid
      if (blankRow % 2 == 0) { // blank on odd row; counting from bottom
        return parity % 2 == 0;
      } else { // blank on even row; counting from bottom
        return parity % 2 != 0;
      }
    } else { // odd grid
      return parity % 2 == 0;
    }
  }

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
    this.onChangeCallback(this.state.rows);
    if (this.isSolved()) {
      this.onEndCallback();
    }
  }

  private isSolved(): boolean {
    if (this.emptyPosition[0] !== 3 || this.emptyPosition[1] !== 3) {
      return false;
    }
    return isEqual(this.state.rows, Game.solutionRows);
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
    return this.state.rows[row][col];
  }

  private setValue([row, col]: Coordinate, value: Tile): void {
    this.state.rows[row][col] = value;
  }

  private findEmptyCoordinates(): Coordinate {
    const { rows } = this.state;
    for (let i: number = 0; i < rows.length; i++) {
      for (let j: number = 0; j < rows[0].length; j++) {
        if (rows[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }
}

export default Game;
