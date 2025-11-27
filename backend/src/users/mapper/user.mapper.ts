import { LoginUserResponseDto } from "src/auth/dto/login-user-response.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { ResponseUserDto } from "../dto/response-user.dto";
import { User } from "../entities/user.entity";
import bcrypt from "node_modules/bcryptjs";
import { LoginUserPayload } from "src/auth/dto/login-user-payload";

export class UserMapper {
    static toResponse(user:User | null): ResponseUserDto {
        try{
            if(user === null) throw new Error('User cannot be null');
            let newUser = new ResponseUserDto()
            newUser.id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.role = user.role;
            return newUser
        }catch(e){
            throw new Error(e.message);
        }
    }
    static toEntity(user:CreateUserDto):User{
        let newUser = new User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = bcrypt.hashSync(user.password, 10);
        return newUser;
    }
    static toLoginUser(user:User | null):LoginUserPayload{
        try{
            if(user === null) throw new Error('User cannot be null');
            let loginUser = new LoginUserPayload();
            loginUser.email = user.email;
            loginUser.id = user.id;
            loginUser.role = user.role;
            loginUser.exp = Date.now() + 60 * 60;
            return loginUser;
        }catch(e){
            throw new Error(e.message);
        }
    }
}