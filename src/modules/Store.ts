/**
 * Store class
 *
 * A wrapper around localStorage that allows us to more reliably use parsed
 * javascript value types like true, false, null, etc instead of having to use
 * comparisons against their serialized counterparts.
 *
 * It's common to need to do something like
 * if (localStorage.getItem('isLoggedIn') === 'true') { ... }
 *
 * But this will allow us to do something like:
 * if (store.get('isLoggedIn')) { ... }
 */
class Store {
  /**
   * Gets the item in localstorage. Return values are parsed using JSON.parse().
   */
  get(key: string): any {
    const value = localStorage.getItem(key);
    if (value === null) {
      return value;
    }
    return JSON.parse(value);
  }

  /**
   * Sets the item in localstorage. Setting undefined as a value has no effect.
   * All other values are serialized using JSON.stringify. Because the values
   * are serialized, retrieving an object or array will not give you the
   * original reference.
   */
  set(key: string, value: any): void {
    if (value === undefined) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }

  /**
   * Removes the item from localstorage. Behavior is identical as
   * localStorage.removeItem.
   */
  remove(key: string): void {
    localStorage.removeItem(key);
    return;
  }
}

export default Store;
