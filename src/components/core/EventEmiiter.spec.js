import EventEmitter from "./EventEmitter";

describe("Lanzador de Eventos", () => {
    it('Deberia emitir al menos un evento', () => {
        const eventEmitter = new EventEmitter();
        const callback = jest.fn();
        eventEmitter.on("test", callback);
        eventEmitter.emit("test");
        expect(callback).toHaveBeenCalled();
    });
    
});