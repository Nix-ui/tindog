import config from "../config/config";

export default class BreedService {
    
    constructor() {
        if(BreedService.instance) {
            return BreedService.instance;
        }
        BreedService.instance = this;
    }
    /**
     * 
     * @param {RegisterUserModel} user 
     */
    async getAllBreed(user) {
        const response = await fetch(`${config().API_URL}/breeds`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }

    async getBreedByName(name){
        const response = await fetch(`${config().API_URL}/breeds/search?name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
}