import config from "../config/config";
import { RegisterUserModel } from "../models/user/register-user.model";

export default class UserService {
    
    constructor() {
        if(UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = this;
    }
    /**
     * 
     * @param {RegisterUserModel} user 
     */
    async registerUser(user) {
        const response = await fetch(`${config().API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
}