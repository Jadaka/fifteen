import { cloneDeep, isEqual, every } from 'lodash';

import Game, { Rows } from './Game';

let game: Game;
const startingRows: Rows = [
  [1, 2, 3, 4],
  [5, 0, 6, 7],
  [9, 10, 11, 8],
  [13, 14, 15, 12],
];

describe('Game Class', () => {
  beforeEach(() => {
    game = new Game(cloneDeep(startingRows));
  });

  test('Should initialize with the correct empty coorinates.', () => {
    expect(game.getEmptyCoordinate()).toEqual([1, 1]);
  });

  test('should be able to retrieve current state', () => {
    expect(game.getRows()).toEqual(startingRows);
  });

  test('method moveRight moves the empty slot left.', () => {
    game.moveRight();

    expect(game.getEmptyCoordinate()).toEqual([1, 0]);
  });

  test('method moveLeft moves the empty slot left right.', () => {
    game.moveLeft();

    expect(game.getEmptyCoordinate()).toEqual([1, 2]);
  });

  test('method moveUp moves the empty slot down.', () => {
    game.moveUp();

    expect(game.getEmptyCoordinate()).toEqual([2, 1]);
  });

  test('method moveDown moves the empty slot up.', () => {
    game.moveDown();

    expect(game.getEmptyCoordinate()).toEqual([0, 1]);
  });

  test('instance calls the end callback when game ends.', () => {
    const onEndedCallback = jest.fn();

    game.onEnd(onEndedCallback);
    game.moveLeft();
    game.moveLeft();
    game.moveUp();
    game.moveUp();

    expect(onEndedCallback).toHaveBeenCalledTimes(1);
  });

  test('instance should always be solvable', () => {
    let instances = [];
    for (let i = 0; i < 50; i++) {
      instances.push(new Game());
    }

    const isEveryInstanceSolvable = every(instances, (instance: Game) => (
      Game.isSolvable(instance.getRows())
    ));
    expect(isEveryInstanceSolvable).toBe(true);
  });

  test('static generateRandomRows() should create random rows.', () => {
    const rows1 = Game.generateRandomRows();
    const rows2 = Game.generateRandomRows();
    const rows3 = Game.generateRandomRows();

    expect(isEqual(rows1, rows2)).toBe(false);
    expect(isEqual(rows1, rows3)).toBe(false);
    expect(isEqual(rows2, rows3)).toBe(false);
  });

  test('static isSolvable() detects solvable permutations.', () => {
    const solvable = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ];

    expect(Game.isSolvable(solvable)).toBe(true);
  });

  test('static isSolvable() detects unsolvable permutations.', () => {
    const unsolvable = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 15, 14, 0]
    ];

    expect(Game.isSolvable(unsolvable)).toBe(false);
  });
});
