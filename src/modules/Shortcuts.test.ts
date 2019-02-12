import Shortcuts from './Shortcuts';
import { fireKeystroke } from '../test-utils/events';

let shortcuts: Shortcuts;

describe('Shortcuts class', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn(document.addEventListener);
    shortcuts = new Shortcuts();
  });

  test('should initialize a keyboard listener', () => {
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  test('should be able to register shortcut keys', () => {
    const cb = jest.fn();
    shortcuts.addShortcut('n', cb);

    fireKeystroke(document, 'n');
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
