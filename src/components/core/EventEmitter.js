class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Registra un listener para un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función callback
   * @returns {Function} Función para desuscribirse
   */
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(callback);

    // Retornar función para desuscribirse
    return () => this.off(event, callback);
  }

  /**
   * Registra un listener que se ejecuta solo una vez
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función callback
   */
  once(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  /**
   * Remueve un listener de un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función callback a remover
   */
  off(event, callback) {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event);
    const index = listeners.indexOf(callback);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    // Si no quedan listeners, eliminar el evento
    if (listeners.length === 0) {
      this.events.delete(event);
    }
  }

  /**
   * Emite un evento con datos
   * @param {string} event - Nombre del evento
   * @param {...any} args - Argumentos a pasar a los callbacks
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
   * Remueve todos los listeners de un evento específico
   * @param {string} event - Nombre del evento
   */
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  /**
   * Obtiene la cantidad de listeners para un evento
   * @param {string} event - Nombre del evento
   * @returns {number}
   */
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

export default EventEmitter;
