interface TimerOptions {
  limit: number
  interval?: number
}

class Timer {
  constructor({ limit, interval = 1000 }: TimerOptions) {
    this.limit = limit;
    this.interval = interval;
  }
  private limit: number;
  private interval: number;
  private tickCount: number = 0;
  private onTickCallback: Function = () => {};
  private onEndedCallback: Function = () => {};
  private timerId?: number;

  public start(): void {
    this.startInternalTimer();
  }

  public stop(): void {
    this.stopInternalTimer();
  }

  public reset(): void {
    if (this.timerId === undefined) {
      return;
    }

    this.stopInternalTimer();
    this.resetInteranlState();
  }

  public onTick(callback: Function): void {
    this.onTickCallback = callback;
  }

  public onEnded(callback: Function): void {
    this.onEndedCallback = callback;
  }

  private resetTimerId = (): void => {
    this.timerId = undefined;
  }

  private resetTickCount = (): void => {
    this.tickCount = 0;
  }

  private resetInteranlState = (): void => {
    this.resetTimerId();
    this.resetTickCount();
  }

  private handleInterval = (): void => {
    this.tickCount++;
    this.onTickCallback();
    if (this.tickCount === this.limit) {
      this.onEnd();
    }
  }

  private startInternalTimer = (): void => {
    if (this.timerId) {
      throw Error(
          `There is already a timer running. Timer ID: ${this.timerId}`);
    }
    this.timerId = window.setInterval(this.handleInterval, this.interval);
  }

  private stopInternalTimer = (): void => {
    window.clearInterval(this.timerId);
    this.resetTimerId();
  }

  private onEnd(): void {
    this.stopInternalTimer();
    this.onEndedCallback();
  }
}

export default Timer;
