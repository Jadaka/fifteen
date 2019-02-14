import React, { Component } from 'react';

import GameComponent from '../components/Game';
import Game, { Rows } from '../modules/Game';
import Shortcuts from '../modules/Shortcuts';
import Timer from '../modules/Timer';

type Props = {};
interface State {
  started: boolean
  timerCount: number
  rows: Rows
}

class GameContainer extends Component<Props, State> {
  private shortcuts: Shortcuts
  private game: Game
  private timer: Timer
  state: State

  constructor(props: any) {
    super(props);
    this.game = new Game();
    this.shortcuts = new Shortcuts();
    this.timer = new Timer({ limit: Infinity });

    this.game.onChange(this.onRowsChanged);
    this.game.onEnd(this.onGameEnded);
    this.timer.onTick(this.onTimerTick);

    this.state = {
      started: false,
      timerCount: 0,
      rows: this.game.getRows(),
    };
  }

  onRowsChanged = (rows: Rows): void => {
    this.setState({ rows });
  }

  onGameEnded = (): void => {
    console.log('game ended');
  }

  onTimerTick = (count: number): void => {
    this.setState({ timerCount: count });
  }

  start = (): void => {
    this.timer.start();
    this.setState({ started: true });
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

  registerShortcuts = (): void => {
    this.shortcuts.addShortcut('ArrowUp', this.upKeyPressed);
    this.shortcuts.addShortcut('ArrowDown', this.downKeyPressed);
    this.shortcuts.addShortcut('ArrowRight', this.rightKeyPressed);
    this.shortcuts.addShortcut('ArrowLeft', this.leftKeyPressed);
  }

  unregisterShortcuts = (): void => {
    this.shortcuts.removeShortcut('ArrowUp');
    this.shortcuts.removeShortcut('ArrowDown');
    this.shortcuts.removeShortcut('ArrowRight');
    this.shortcuts.removeShortcut('ArrowLeft');
    this.shortcuts.teardown();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { rows, started, timerCount } = this.state;
    return (
      <GameComponent
        rows={rows}
        started={started}
        timerCount={timerCount}
      />
    );
  }
}

export default GameContainer;
