/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService { 
    constructor(
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) {
    }

    async createToken(email: string,) {
        console.log('AuthService:createToken...')
        const user: JwtPayload = {
            email: email
        };
        return this.jwtService.sign(user);
    }

    async validateUser(email: string, senha: string): Promise<any> {
        console.log('AuthService:validateUser...')
        const usuario = await this.usuarioService.buscarPorEmail(email)
        console.log('AuthService:validateUser:usuario: ' + usuario)

        if (usuario && await bcrypt.compareSync(senha, usuario.senha)) {
            const resultado = {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email
            }

            return resultado
        }
        console.log('AuthService:validateUser:senha incorreta')
        return null
    }

    async login(usuario: any) {
        console.log('AuthService:login...')
        const payload = { email: usuario.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
