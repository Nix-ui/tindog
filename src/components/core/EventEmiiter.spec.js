import EventEmitter from "./EventEmitter";

describe("Lanzador de Eventos", () => {
    it('Deberia emitir al menos un evento', () => {
        const eventEmitter = new EventEmitter();
        const callback = jest.fn();
        eventEmitter.on("test", callback);
        eventEmitter.emit("test");
        expect(callback).toHaveBeenCalled();
    });
    it("deberia emitir mas de un evento", () => {
        const eventEmitter = new EventEmitter();
        const callback = jest.fn();
        eventEmitter.on("test", callback);
        eventEmitter.emit("test");
        eventEmitter.emit("test");
        eventEmitter.emit("test");
        expect(callback).toHaveBeenCalledTimes(3);
    });
    it('Deveria emitir solo un evento', () => {
        const eventEmitter = new EventEmitter();
        const callback = jest.fn();
        eventEmitter.once("test", callback);
        eventEmitter.emit("test");
        eventEmitter.emit("test");
        eventEmitter.emit("test");
        expect(callback).toHaveBeenCalledTimes(1);
    });
});