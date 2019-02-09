import Game, { GameState } from './Game';

let game: Game;
const defaultState: GameState = {
  tiles: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null]
  ],
};

describe('Game Class', () => {
  beforeEach(() => {
    game = new Game(defaultState);
  });

  test('Should move the null value appropriately', () => {
    game.moveRight();
    expect(game.getEmptyCoordinates()).toEqual([3, 2]);
  });
});
