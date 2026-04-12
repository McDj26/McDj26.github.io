export class GlobalBus {
  private static listeners: Record<string, Array<Function>> = {};
  private static onceListeners: Record<string, Array<Function>> = {};
  static on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  static once(event: string, listener: Function) {
    if (!this.onceListeners[event]) {
      this.onceListeners[event] = [];
    }
    this.onceListeners[event].push(listener);
  }

  static off(event: string, listener: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (l) => l !== listener
      );
    }
    if (this.onceListeners[event]) {
      this.onceListeners[event] = this.onceListeners[event].filter(
        (l) => l !== listener
      );
    }
  }

  static offAll(event: string) {
    if (this.listeners[event]) {
      delete this.listeners[event];
    }
    if (this.onceListeners[event]) {
      delete this.onceListeners[event];
    }
  }

  static emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => listener(...args));
    if (this.onceListeners[event]) {
      this.onceListeners[event].forEach((listener) => listener(...args));
      delete this.onceListeners[event];
    }
  }
}
