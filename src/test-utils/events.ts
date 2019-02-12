/**
 * Triggers an HTML event
 */
export const fireKeystroke = (target: HTMLElement|Document, targetKey: string) => {
  target.dispatchEvent(createKeyboardEvent('keydown', targetKey));
  target.dispatchEvent(createKeyboardEvent('keypress', targetKey));
  target.dispatchEvent(createKeyboardEvent('keyup', targetKey));
};

export const createKeyboardEvent =
  (type: string, key: string): KeyboardEvent => (new KeyboardEvent(type, {
  bubbles: true,
  key,
}));
