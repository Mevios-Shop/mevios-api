import { UsuarioService } from './../usuarios/usuario.service';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
      ) { }

    async validarUsuario(usuarioEmail: string, usuarioSenha: string) {
        const usuario = await this.usuarioService.buscarPorEmail(usuarioEmail)

        if (usuario && usuario.senha === usuarioSenha) {
            const { id, nome, email } = usuario
            return { id: id, nome, email }
        }

        return null
    }

    async login(usuario: any) {
        const payload = { email: usuario.email, sub: usuario.id }

        return {
            acces_token: this.jwtService.sign(payload)
        }
    }
 }
