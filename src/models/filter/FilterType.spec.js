import FilterType from "./FilterType";

describe("Tipo de Filtro", () => {
    it('Deberia ser una clase', () => {
        const filter = new FilterType();
        expect(filter).toBeInstanceOf(FilterType);
    });
})