import { clone } from 'lodash';

export interface GameState {
  tiles: Array<Array<number|null>>
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
    this.emptyPosition = [3, 3];
  }
  private state: GameState
  private emptyPosition: Coordinate

  public getEmptyCoordinates() {
    return clone(this.emptyPosition);
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
