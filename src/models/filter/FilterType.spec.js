import FilterType from "./FilterType";

describe("Tipo de Filtro", () => {
    it('Deberia ser una clase', () => {
        const filter = new FilterType();
        expect(filter).toBeInstanceOf(FilterType);
    });
    it('Deberia tener un callback', () => {
        const filter = new FilterType('','',()=>{return 'callback'},'','',()=>{});
        expect(filter.callback).toBeInstanceOf(Function);
        const response = filter.callback();
        expect(response).toBe('callback');
    });
    it('Deberia tener un value por defecto', () => {
        const filter = new FilterType('','',()=>{return 'callback'},'','');
        expect(filter.value).toBe('Seleccione una opcion');
    });
    it('Deberia Tener un fucion para aplicar el filtro', () => {
        const filter = new FilterType('','',()=>{return 'callback'},'','');
        expect(filter.fuctionToApply).toBeInstanceOf(Function);
    });
    it('Deberia tener un id especifico',()=>{
        const filter = new FilterType('select','gender',()=>{return 'callback'},'','');
        expect(filter.id).toBe('gender-select');
    })
    it('Deberia tener un value por defecto',()=>{
        const filter = new FilterType('select','gender',()=>{return 'callback'},'','');
        expect(filter.value).toBe('Seleccione una opcion');
    })
    it('Deberia definir un callback para disparar',()=>{
        let filter = new FilterType('select','gender',null,'','');
        filter.setCallback(()=>{return "callback"})
        expect(filter.callback).toBeInstanceOf(Function);
        expect(filter.callback()).toBe("callback");
    })
    it('Deberia definir una lista de valores para el filtro',()=>{
        let filter = new FilterType('select','gender',null,'','');
        const generos = ["Masculino","Femenino"];
        filter.setValues(generos);
        expect(filter.values).toBeInstanceOf(Array)
        expect(filter.values).toBe(generos)

    })
})