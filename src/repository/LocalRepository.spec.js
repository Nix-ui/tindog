import LocalRepository from "./LocalRepository";

describe("LocalRepository", () =>{
    const localRepository = new LocalRepository();
    it('Deberia guardar una clave valor en local storage', () => {
        localRepository.saveInLocalStorage('key', 'value');
        const value = localStorage.getItem('key');
        expect(value).not.toBe(null);
    });
    it('Deberia obtener un valor ya guardado en el local storage', () => {
        const data = 'value';
        localRepository.saveInLocalStorage('key', data);
        const value = localRepository.getFromLocalStorage('key');
        expect(value).toBe(data);
    });
});