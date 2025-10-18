
export default class BaseFormComponent{
    constructor(data, options={}){
        this.data = data;
        this.options = options;
    }

    renderFields(){
        throw new Error('Method not implemented');
    }

    renderField(name,type,placeholder){
        return `
            <div class="form-group">
                <label for="${name}">${name}</label>
                <input type="${type}" name="${name}" id="${name}" class="form-control" placeholder="${placeholder}">
            </div>
        `
    }
    clearFields(){
        throw new Error('Method not implemented');
    }
}