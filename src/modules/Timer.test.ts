import Timer from './Timer';

import { wait } from '../test-utils/time';

let timer: Timer;
const limit: number = 6;
const interval: number = 10;
const allowance: number = 5;
// Add an extra 10ms as allowance.
const maxTimeout: number = (limit * interval) + 10;

describe('Timer class', () => {
  beforeEach(() => {
    timer = new Timer({ limit, interval });
  });

  test('should invoke the onEnded callback eventually', async () => {
    const endCallback = jest.fn();

    timer.onEnded(endCallback);
    timer.start();
    await wait(maxTimeout);

    expect(endCallback).toHaveBeenCalledTimes(1);
  });

  test('should tick the correct number of times', async () => {
    const tickCallback = jest.fn();

    timer.onTick(tickCallback);
    timer.start();
    await wait(maxTimeout);

    expect(tickCallback).toHaveBeenCalledTimes(limit);
  });

  test('should correctly stop the timer', async () => {
    const tickCallback = jest.fn();
    timer.onTick(tickCallback);
    timer.start();
    await wait(interval);

    timer.stop();
    await wait(interval * 2);

    expect(tickCallback).toHaveBeenCalledTimes(1);
  });

  test('should correctly stop and start the timer', async () => {
    const tickCallback = jest.fn();
    timer.onTick(tickCallback);

    timer.start();
    await wait(interval + allowance); // Ticks once.
    timer.stop();
    await wait(interval * 4); // Shouldn't tick here because we're stopped.
    timer.start();
    await wait(interval + allowance); // Ticks again.

    expect(tickCallback).toHaveBeenCalledTimes(2);
  });

  test('Should not be able to start the timer without calling stop.', () => {
    const runTimerTwice = () => {
      timer.start();
      timer.start();
    };
    expect(runTimerTwice).toThrow();
  });

  test('Should be able to start the timer again by resetting.', async () => {
    const endCallback = jest.fn();

    timer.onEnded(endCallback);
    timer.start();
    await wait(maxTimeout);
    timer.reset();
    timer.start();
    await wait(maxTimeout);

    expect(endCallback).toHaveBeenCalledTimes(2);
  });
});
