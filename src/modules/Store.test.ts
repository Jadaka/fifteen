import Store from './Store';

let store: Store;

describe('Store class', () => {
  beforeEach(() => {
    store = new Store();
  });

  test('should return null for unset keys', () => {
    expect(store.get('typo')).toBe(null);
  });

  test('should behave like an undefined key for null values', () => {
    store.set('hello', null);

    expect(store.get('hello')).toBe(null);
  });

  test('should be able to set and get strings', () => {
    store.set('key', 'value');
    expect(store.get('key')).toBe('value');
  });

  test('should be able to set and get numbers', () => {
    store.set('key', 8000);
    expect(store.get('key')).toBe(8000);
  });

  test('should be able to set and get booleans', () => {
    store.set('pancakes', true);
    store.set('waffles', false);

    expect(store.get('pancakes')).toBe(true);
    expect(store.get('waffles')).toBe(false);
  });

  test('should be able to store objects', () => {
    const fixture = { a: true, b: 1, c: 'hello', d: [1,2,3,4,5] };
    store.set('obj', fixture);

    expect(store.get('obj')).toEqual(fixture);
  });

  test('should be able to store arrays', () => {
    const fixture = [{ type: 'dog' }, 3, true, "hello", [1,2,3,4,5]];
    store.set('arr', fixture);

    expect(store.get('arr')).toEqual(fixture);
  });
});
