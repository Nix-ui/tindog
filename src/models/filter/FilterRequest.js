export default class FilterRequest {
    /**
     * 
     * @param {string} type Tipo de filtro
     * @param {string} field Campo a filtrar
     * @param {string} value Valor a filtrar
     * @param {function} callback Función callback
     */
    constructor(type, field, value, callback) {
        this.type = type;
        this.field = field;
        this.value = value;
        this.callback = callback.bind(this);
    }
}