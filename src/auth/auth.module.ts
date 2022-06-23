import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsuariosModule } from './../usuarios/usuarios.module';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UsuariosModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [
        AuthController, ],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy
    ],
})
export class AuthModule { }
