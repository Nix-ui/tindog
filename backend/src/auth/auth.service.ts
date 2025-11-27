import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserPayload } from './dto/login-user-payload';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from 'src/users/mapper/user.mapper';
import config from 'src/config/config';

@Injectable()
export class AuthService{
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(loginUserRequest:LoginUserRequestDto): Promise<boolean> {
        const user = await this.usersService.findUserbyEmail(
            loginUserRequest.email
        )
        return user !==null;
    }
    private async validatePassword(loginUserRequest:LoginUserRequestDto): Promise<boolean> {
        const user = await this.usersService.findUserbyEmail(
            loginUserRequest.email
        )
        return bcrypt.compare(loginUserRequest.password, user.password);
    }

    private generateToken(payload:LoginUserPayload):LoginUserResponseDto {
        const token = this.jwtService.sign({payload},{
            secret: config().jwt.secret
        });
        let response = new LoginUserResponseDto();
        response.accessToken = token;
        return response;
    }

    async login(loginUserRequest:LoginUserRequestDto): Promise<LoginUserResponseDto> {
        if(await this.validateUser(loginUserRequest) === false) throw new Error("User not found");
        const user = await this.usersService.findUserbyEmail(
            loginUserRequest.email
        )
        if(await this.validatePassword(loginUserRequest) === false) throw new Error("Invalid password");
        const payload = UserMapper.toLoginUser(user);
        const response = this.generateToken(payload);
        return response;
    }
}
