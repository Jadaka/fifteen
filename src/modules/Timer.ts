interface TimerOptions {
  limit: number
  interval?: number
}
interface TimerStats {
  count: number
}

class Timer {
  constructor({ limit, interval = 1000 }: TimerOptions) {
    this.limit = limit;
    this.interval = interval;
  }
  private limit: number;
  private interval: number;
  private tickCount: number = 0;
  private onTickCallback: Function = Timer.doNothing;
  private onEndedCallback: Function = Timer.doNothing;
  private timerId?: number;

  static doNothing() {}

  get stats(): TimerStats {
    return {
      count: this.tickCount,
    };
  }

  public start(): void {
    this.startInternalTimer();
  }

  public stop(): void {
    this.stopInternalTimer();
  }

  public reset(): void {
    this.stopInternalTimer();
    this.resetTickCount();
  }

  public onTick(callback: Function): void {
    this.onTickCallback = callback;
  }

  public onEnded(callback: Function): void {
    if (this.limit === Infinity) {
      throw Error('onEnded will not work with a limit of Infinity');
    }

    this.onEndedCallback = callback;
  }

  private resetTickCount = (): void => {
    this.tickCount = 0;
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
    if (!this.timerId) return;

    window.clearInterval(this.timerId);
    this.timerId = undefined;
  }

  private onEnd(): void {
    this.stopInternalTimer();
    this.onEndedCallback();
  }
}

export default Timer;
