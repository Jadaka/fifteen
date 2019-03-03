import React, { Component } from 'react';

import GameComponent from '../components/Game';
import Game, { Rows } from '../modules/Game';
import Shortcuts from '../modules/Shortcuts';
import Timer from '../modules/Timer';

import { getDebugRows } from '../debug-utils/game.debug';

interface Props {}

interface State {
  started: boolean
  ended: boolean
  timerCount: string
  rows: Rows
}

class GameContainer extends Component<Props, State> {
  private shortcuts: Shortcuts = new Shortcuts();
  private game: Game = new Game();
  private timer: Timer = new Timer({ limit: Infinity, interval: 100 });
  state: State

  constructor(props: any) {
    super(props);
    this.initModuleListeners();

    this.state = {
      started: false,
      ended: false,
      timerCount: '0.0',
      rows: this.game.getRows(),
    };
  }

  initModuleListeners(): void {
    this.setupGameListeners();
    this.setupTimerListeners();
  }

  setupGameListeners(): void {
    this.game.onChange(this.onRowsChanged);
    this.game.onEnd(this.onGameEnded);
  }

  setupTimerListeners(): void {
    this.timer.onTick(this.onTimerTick);
  }

  onRowsChanged = (rows: Rows): void => {
    this.setState({ rows });
  }

  onGameEnded = (): void => {
    this.stop();
  }

  onTimerTick = (count: number): void => {
    this.setState({ timerCount: this.formatCount(count) });
  }

  formatCount(count: number): string {
    return (count / 10).toFixed(1);
  }

  start = (): void => {
    this.timer.start();
    this.setState({ started: true, ended: false });
  }

  restart = (): void => {
    this.timer = new Timer({ limit: Infinity });
    this.game = new Game();
    this.initModuleListeners();
    this.setState({
      timerCount: "0.0",
      rows: this.game.getRows(),
    }, this.start);
  }

  stop = (): void => {
    this.timer.stop();
    this.setState({ ended: true });
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

  spaceKeyPressed = (): void => {
    const { started, ended } = this.state;
    if (started && !ended) {
      return;
    }

    if (ended) {
      this.restart();
    } else {
      this.start();
    }
  }

  registerShortcuts = (): void => {
    this.shortcuts.addShortcut('ArrowUp', this.upKeyPressed);
    this.shortcuts.addShortcut('ArrowDown', this.downKeyPressed);
    this.shortcuts.addShortcut('ArrowRight', this.rightKeyPressed);
    this.shortcuts.addShortcut('ArrowLeft', this.leftKeyPressed);
    this.shortcuts.addShortcut(' ', this.spaceKeyPressed);
  }

  unregisterShortcuts = (): void => {
    this.shortcuts.removeShortcut('ArrowUp');
    this.shortcuts.removeShortcut('ArrowDown');
    this.shortcuts.removeShortcut('ArrowRight');
    this.shortcuts.removeShortcut('ArrowLeft');
    this.shortcuts.removeShortcut('Space');
    this.shortcuts.teardown();
  }

  componentDidMount() {
    this.registerShortcuts();
  }

  componentWillUnmount() {
    this.unregisterShortcuts();
  }

  render() {
    const { rows, started, timerCount, ended } = this.state;
    return (
      <GameComponent
        rows={rows}
        started={started}
        ended={ended}
        timerCount={timerCount}
      />
    );
  }
}

export default GameContainer;
