/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
    constructor(
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.buscarPorEmail(email)

        if (usuario && await bcrypt.compareSync(senha, usuario.senha)) {
            const resultado = {
                "nome": usuario.nome,
                "email": usuario.email
            }

            return resultado
        }
        return null
    }

    async login(usuario: any) {
        const payload = { nome: usuario.nome, email: usuario.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
