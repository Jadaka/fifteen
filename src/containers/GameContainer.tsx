import React, { Component } from 'react';

import GameComponent from '../components/Game';
import Shortcuts from '../modules/Shortcuts';
import Game, { Rows } from '../modules/Game';
import Tiles from '../components/Tiles';

type Props = {};
interface State {
  rows: Rows
}

class GameContainer extends Component<Props, State> {
  private shortcuts: Shortcuts
  private game: Game
  state: State

  constructor(props: any) {
    super(props);
    this.shortcuts = new Shortcuts();
    this.game = new Game();
    this.game.onChange(this.onChange);
    this.game.onEnd(this.onEnd);
    this.state = {
      rows: this.game.getRows(),
    };
  }

  onChange = (rows: Rows): void => {
    this.setState({ rows });
  }

  onEnd = (): void => {
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
    return <GameComponent rows={rows} />;
  }
}

export default GameContainer;
