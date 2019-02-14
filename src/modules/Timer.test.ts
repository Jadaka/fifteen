import Timer from './Timer';

import { wait } from '../test-utils/time';

let timer: Timer;
const limit: number = 3;
const interval: number = 50;
// extra buffer
const allowance: number = 25;
const maxTimeout: number = (limit * interval) + allowance;

describe('Timer stopwatch', () => {
  beforeEach(() => {
    timer = new Timer({ limit, interval });
  });

  test('Should invoke the onEnded callback eventually.', async () => {
    const endCallback = jest.fn();

    timer.onEnded(endCallback);
    timer.start();
    await wait(maxTimeout);

    expect(endCallback).toHaveBeenCalledTimes(1);
  });

  test('Should tick the correct number of times.', async () => {
    const tickCallback = jest.fn();

    timer.onTick(tickCallback);
    timer.start();
    await wait(maxTimeout);

    expect(tickCallback).toHaveBeenCalledTimes(limit);
  });

  test('Should provide the tick count as an arg to tickCallback.', async () => {
    let expectedTickCount = 0;
    const tickCallback = (tickCount: number) => {
      expectedTickCount++;
      expect(tickCount).toBe(expectedTickCount);
    };
    timer.onTick(tickCallback);
    timer.start();
    await wait(maxTimeout);
  });

  test('Should correctly stop the timer.', async () => {
    const tickCallback = jest.fn();
    timer.onTick(tickCallback);
    timer.start();
    await wait(interval);

    timer.stop();
    await wait(interval * 2);

    expect(tickCallback).toHaveBeenCalledTimes(1);
  });

  test('Should correctly stop and start the timer.', async () => {
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

  test('Should not taken an onEnded callback for an infinite timer.', () => {
    timer = new Timer({ limit: Infinity });
    const runOnEnded = () => {
      timer.onEnded(() => {});
    };

    expect(runOnEnded).toThrow();
  });

  test('Should retrieve the tick count for an infinite timer.', async () => {
    timer = new Timer({ limit: Infinity, interval });
    timer.start();
    await wait(interval * 3); // Should tick 3 times
    await wait(allowance);
    timer.stop();

    expect(timer.stats.count).toBe(3);

    timer.start();
    await wait(interval * 2); // Should tick 2 more times
    await wait(allowance);
    timer.stop();

    expect(timer.stats.count).toBe(5);
  });
});
