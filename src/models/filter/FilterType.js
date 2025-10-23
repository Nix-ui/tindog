export default class FilterType {
    constructor(type,name,id,callback,value,fuctionToApply) {
        if(value === undefined || value === null || value === '') this.value = 'Seleccione una opcion';
        this.type = type;
        this.id = id;
        this.name = name;
        this.callback = callback;
        this.value = value;
        this.fuctionToApply = fuctionToApply;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    setValues(values){
        this.values = values;
    }
}