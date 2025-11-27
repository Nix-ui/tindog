import config from "../config/config";
import LocalRepository from "../repository/LocalRepository";
import { JwtService } from "./jwt.service";


const localRepository = new LocalRepository();
const jwtServiec = new JwtService();

export class AuthService {
    #localRepository;
    constructor() {
        this.authenticated = false;
        
    }

    async login(loginUserRequest) {
        console.log(loginUserRequest);
        await fetch(`${config().API_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUserRequest)
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                this.authenticated = true;
                response.json().then((data) => {
                    this.authenticated = true;
                    console.log(data);
                    localRepository.saveInLocalStorage('authorized', true);
                    localRepository.saveInLocalStorage('token', data.accessToken);
                    jwtServiec.SetJwtToketInfoToLocalStorage(data.accessToken);
                    return data.accessToken;
                });
            }
        })
    }
}