import { cloneDeep } from 'lodash';

import Game, { GameState } from './Game';

let game: Game;
const defaultState: GameState = {
  tiles: [
    [1,  2,    3,  4],
    [5,  null, 6,  7],
    [9,  10,   11, 8],
    [13, 14,   15, 12],
  ],
};

describe('Game Class', () => {
  beforeEach(() => {
    game = new Game(cloneDeep(defaultState));
  });

  test('Should initialize with the correct empty coorinates.', () => {
    expect(game.getEmptyCoordinates()).toEqual([1, 1]);
  });

  test('moveRight should move the empty slot left.', () => {
    game.moveRight();
    expect(game.getEmptyCoordinates()).toEqual([1, 0]);
  });

  test('moveLeft should move the empty slot left right.', () => {
    game.moveLeft();
    expect(game.getEmptyCoordinates()).toEqual([1, 2]);
  });

  test('moveUp should move the empty slot down.', () => {
    game.moveUp();
    expect(game.getEmptyCoordinates()).toEqual([2, 1]);
  });

  test('moveDown should move the empty slot up.', () => {
    game.moveDown();
    expect(game.getEmptyCoordinates()).toEqual([0, 1]);
  });
});
