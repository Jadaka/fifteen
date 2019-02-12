import Shortcuts from './Shortcuts';
import { fireKeystroke } from '../test-utils/events';

let shortcuts: Shortcuts;

describe('Shortcuts class', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn(document.addEventListener);
    document.removeEventListener = jest.fn(document.removeEventListener);
    shortcuts = new Shortcuts();
  });

  test('should initialize a keyboard listener', () => {
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  test('should be able to register shortcut keys', () => {
    const nCallback = jest.fn();
    const cCallback = jest.fn();

    shortcuts.addShortcut('n', nCallback);
    shortcuts.addShortcut('c', cCallback);
    fireKeystroke(document, 'n');
    fireKeystroke(document, 'c');
    fireKeystroke(document, 'c');

    expect(nCallback).toHaveBeenCalledTimes(1);
    expect(cCallback).toHaveBeenCalledTimes(2);
  });

  test('should be able to register shortcut keys for arrow keys', () => {
    const up = jest.fn();
    const down = jest.fn();
    const right = jest.fn();
    const left = jest.fn();

    shortcuts.addShortcut('ArrowUp', up);
    shortcuts.addShortcut('ArrowDown', down);
    shortcuts.addShortcut('ArrowLeft', right);
    shortcuts.addShortcut('ArrowRight', left);
    fireKeystroke(document, 'ArrowUp');
    fireKeystroke(document, 'ArrowDown');
    fireKeystroke(document, 'ArrowLeft');
    fireKeystroke(document, 'ArrowRight');

    expect(up).toHaveBeenCalledTimes(1);
    expect(down).toHaveBeenCalledTimes(1);
    expect(right).toHaveBeenCalledTimes(1);
    expect(left).toHaveBeenCalledTimes(1);
  });

  test('should be able to unregister shortcut keys', () => {
    const up = jest.fn();
    shortcuts.addShortcut('ArrowUp', up);
    fireKeystroke(document, 'ArrowUp');
    fireKeystroke(document, 'ArrowUp');

    shortcuts.removeShortcut('ArrowUp', up);
    fireKeystroke(document, 'ArrowUp');
    expect(up).toHaveBeenCalledTimes(2);
  });

  test('should be able to unregister all handlers for a given key', () => {
    const up = jest.fn();
    const up2 = jest.fn();
    shortcuts.addShortcut('ArrowUp', up);
    shortcuts.addShortcut('ArrowUp', up2);
    fireKeystroke(document, 'ArrowUp');
    fireKeystroke(document, 'ArrowUp');

    shortcuts.removeShortcut('ArrowUp');
    fireKeystroke(document, 'ArrowUp');
    expect(up).toHaveBeenCalledTimes(2);
    expect(up2).toHaveBeenCalledTimes(2);
  });

  test('should remove DOM listeners upon tearing down', () => {
    shortcuts.teardown();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
