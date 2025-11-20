export default class FilterRequest {
    /**
     * 
     * @param {string} type
     * @param {string} field
     * @param {string} value
     * @param {function} callback
     */
    constructor(type, field, value, callback) {
        this.type = type;
        this.field = field;
        this.value = value;
        this.callback = callback === undefined || callback === null || callback === '' ? () => {} : callback.bind(this);
    }
}