export default class FilterType {
    constructor(type,name,id,callback,value) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.callback = callback;
        this.value = value;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    setValues(values){
        this.values = values;
    }
}