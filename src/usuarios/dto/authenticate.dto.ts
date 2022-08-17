import { IsNotEmpty, IsString } from "class-validator"

export class AuthenticateDto {
    constructor() {
    }

    @IsString()
    @IsNotEmpty()
    public email: string

    @IsString()
    @IsNotEmpty()
    public senha: string
}