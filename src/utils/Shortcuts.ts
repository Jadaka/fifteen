type KeyHandlers = Set<Function>
type Events = Map<string, KeyHandlers>

class Shortcuts {
  events: Events
  constructor() {
    this.events = new Map();
    this.init();
  }

  public addShortcut(keyName: string, handler: Function): void {
    this.initializeShortcut(keyName);
    const handlers:KeyHandlers = this.getKeyHandlers(keyName);
    handlers.add(handler);
  }

  public removeShortcut(keyName: string, handler?: Function): void {
    if (!handler) {
      this.events.delete(keyName);
      return;
    }
    const handlers:KeyHandlers = this.getKeyHandlers(keyName);
    handlers.delete(handler);
  }

  public teardown() {
    this.events = new Map();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  public init() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event:KeyboardEvent) => {
    event.preventDefault();
    const keyName:string = event.key;
    const handlers:KeyHandlers = this.getKeyHandlers(keyName);
    handlers.forEach(handler => handler(event));
  }

  private getKeyHandlers(keyName:string): KeyHandlers {
    const handlers = this.events.get(keyName) || new Set();
    return handlers;
  }

  private initializeShortcut(keyName:string) {
    if (this.events.has(keyName)) {
      return;
    }

    this.events.set(keyName, new Set());
  }
}

export default Shortcuts;
