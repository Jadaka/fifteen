import React, { Component, ReactElement } from 'react';
import { cloneDeep } from 'lodash';

import Shortcuts from '../Modules/Shortcuts';
import Game, { Rows } from '../Modules/Game';
import Tiles from '../Components/Tiles';

const defaultState = {
  tiles: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ],
};

type Props = {};
type State = Readonly<typeof defaultState>;

class TilesContainer extends Component<Props, State> {
  shortcuts: Shortcuts
  game: Game
  state = cloneDeep(defaultState);

  constructor(props: any) {
    super(props);
    this.shortcuts = new Shortcuts();
    this.game = new Game({
      tiles: Game.generateRandomTiles(),
    });
    this.game.onChange(this.onChange);
  }

  onChange = (tiles: Rows): void => {
    console.log('on change');
    this.setState({ tiles });
  }

  onEnded = (): void => {
    console.log('game ended');
  }

  upKeyPressed = (): void => {
    this.game.moveUp();
  }

  downKeyPressed = (): void => {
    this.game.moveDown();
  }

  rightKeyPressed = (): void => {
    this.game.moveRight();
  }

  leftKeyPressed = (): void => {
    this.game.moveLeft();
  }

  componentDidMount() {
    this.shortcuts.addShortcut('ArrowUp', this.upKeyPressed);
    this.shortcuts.addShortcut('ArrowDown', this.downKeyPressed);
    this.shortcuts.addShortcut('ArrowRight', this.rightKeyPressed);
    this.shortcuts.addShortcut('ArrowLeft', this.leftKeyPressed);
  }

  componentWillUnmount() {
    this.shortcuts.removeShortcut('ArrowUp');
    this.shortcuts.removeShortcut('ArrowDown');
    this.shortcuts.removeShortcut('ArrowRight');
    this.shortcuts.removeShortcut('ArrowLeft');
    this.shortcuts.teardown();
  }

  render() {
    const { tiles } = this.state;
    return <Tiles tiles={tiles} />;
  }
}

export default TilesContainer;
