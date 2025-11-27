import PetSearchByDto from "../dto/pet-search-by.dto";

export class PetSearchHandler {
    private static isValid(field: object){
        return field[Object.keys(field)[0]] !== undefined
    }
    private static addSearchBy(result: object, field: object){
        console.log(this.isValid(field));
        if(this.isValid(field)){
            result = {
                ...result,
                ...field
            }
        }
        return result
    }
    static handle(PetSearchByDto: PetSearchByDto) {
        const { address, size, breed } = PetSearchByDto;
        let result;
        result = this.addSearchBy(result, { address });
        result = this.addSearchBy(result, { size });
        result = this.addSearchBy(result, { breed });
        return result
    }
}