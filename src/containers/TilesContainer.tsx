import React, { Component, ReactElement } from 'react';
import { cloneDeep } from 'lodash';

import Shortcuts from '../modules/Shortcuts';
import Game, { Rows } from '../modules/Game';
import Tiles from '../components/Tiles';

type Props = {};
interface State {
  rows: Rows
}

class TilesContainer extends Component<Props, State> {
  shortcuts: Shortcuts
  game: Game
  state: State

  constructor(props: any) {
    super(props);
    this.shortcuts = new Shortcuts();
    this.game = new Game();
    this.game.onChange(this.onChange);
    this.state = {
      rows: this.game.getRows(),
    };
  }

  onChange = (rows: Rows): void => {
    this.setState({ rows });
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
    const { rows } = this.state;
    return <Tiles rows={rows} />;
  }
}

export default TilesContainer;
