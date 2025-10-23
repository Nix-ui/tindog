export default class FilterType {
    constructor(type,name,id,callback,value,fuctionToApply) {
        if(value === undefined || value === null || value === ''){} this.value = 'Seleccione una opcion';
        this.value = value === undefined || value === null || value === '' ? 'Seleccione una opcion' : value;
        this.type = type;
        this.id = id;
        this.name = name;
        this.callback = callback === undefined || callback === null || callback === '' ? () => {} : callback;
        this.fuctionToApply = fuctionToApply === undefined || fuctionToApply === null || fuctionToApply === '' ? () => {} : fuctionToApply;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    setValues(values){
        this.values = values;
    }
}