import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { Role } from "../entities/enums/role.enum";

export class ResponseUserDto{
    id: number;
    name: string;
    email: string;
    role: Role
}