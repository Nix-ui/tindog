class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   *
   * @param {string} event
   * @param {Function} callback
   * @returns {Function}
   */
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }

  /**
   * 
   * @param {string} event
   * @param {Function} callback
   */
  once(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  /**
   *
   * @param {string} event
   * @param {Function} callback
   */
  off(event, callback) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    if (listeners.length === 0) {
      this.events.delete(event);
    }
  }

  /**
   * @param {string} event
   * @param {...any} args
   */
  emit(event, ...args) {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event);
    listeners.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error en listener de evento "${event}":`, error);
      }
    });
  }
  /**
   * @param {string} event
   */
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  /**
   * @param {string} event
   * @returns {number}
   */
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

export default EventEmitter;
