import FilterRequest from "./FilterRequest";

describe("Solicitud de Filtro", () => {
    it('Deberia ser una clase', () => {
        const filter = new FilterRequest();
        expect(filter).toBeInstanceOf(FilterRequest);
    });
});