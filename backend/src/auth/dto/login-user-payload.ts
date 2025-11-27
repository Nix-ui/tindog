import { Role } from "src/users/entities/enums/role.enum";

export class LoginUserPayload {
    id: number;
    email: string;
    role: Role;
    exp: number;
}