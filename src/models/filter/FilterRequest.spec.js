import FilterRequest from "./FilterRequest";

describe("Solicitud de Filtro", () => {
    it('Deberia ser una clase', () => {
        const filter = new FilterRequest();
        expect(filter).toBeInstanceOf(FilterRequest);
    });
    it('Deberia tener un callback', () => {
        const filter = new FilterRequest('','','',()=>{return 'callback'});
        expect(filter.callback).toBeInstanceOf(Function);
        const response = filter.callback();
        expect(response).toBe('callback');
        const filter2 = new FilterRequest('','','','');
        expect(filter2.callback).toBeInstanceOf(Function);
    });
});