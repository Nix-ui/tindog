import FilterType from "./FilterType";

describe("Tipo de Filtro", () => {
    it('Deberia ser una clase', () => {
        const filter = new FilterType();
        expect(filter).toBeInstanceOf(FilterType);
    });
    it('Deberia tener un callback', () => {
        const filter = new FilterType('','','',()=>{return 'callback'},'','',()=>{});
        expect(filter.callback).toBeInstanceOf(Function);
        const response = filter.callback();
        expect(response).toBe('callback');
    });
    
})