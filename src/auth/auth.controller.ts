/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ResultDto } from 'src/shared/result.dto';
import { AuthenticateDto } from 'src/usuarios/dto/authenticate.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController { 

    constructor(
        private readonly authService: AuthService,
        private usuarioService: UsuarioService
    ) {
        
    }

    @Post('login')
    async login(@Body() authenticateDto: AuthenticateDto) {
        console.log('AuthController:login...')

        const usuario = await this.authService.validateUser(authenticateDto.email, authenticateDto.senha);
        
        if (!usuario) {
            console.log('Usuário não encontrado')
            throw new HttpException('Usuário ou senha inválido', HttpStatus.UNAUTHORIZED)
        }
        console.log('AuthController:login:Usuário encontrado')
        const token = await this.authService.login(usuario)
        console.log('token: ' + token)
        return { usuario: usuario, token: token.access_token }
    }

    // Refesh Token
    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        console.log('AuthController:refreshToken...')
        
        let usuario: Usuario

        try {
            usuario = await this.usuarioService.buscarPorEmail('simoesfelipe21@gmail.com')
            console.log('AuthController:refreshToken:Usuário encontrado')

        } catch (error) {
            console.log('AuthController:Usuário não encontrado')
            throw new HttpException(new ResultDto('Usuário não encontrado', false, null, error), HttpStatus.UNAUTHORIZED)
        }

        try {
            if (usuario) {
                const token = await this.authService.login(usuario)
                console.log('AuthController:refreshToken:token: ' + token)
                return new ResultDto(null, true, token, null) 
            } else {
                throw new HttpException('Usuário não encontrado', HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível gerar o token', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }
}
