import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usuarioService: UsuarioService,
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET_KEY")
        });
    }

    async validate(payload: JwtPayload) {
        console.log('JwtStrategy:validate...')
        console.log('payload', payload)
        const usuario = await this.usuarioService.buscarPorEmail(payload.email)
        if (!usuario) {
            console.log('JwtStrategy:validate:usuario não encontrado')
            throw new UnauthorizedException()
        }
        console.log('JwtStrategy:validate:usuario encontrado')
        return payload
    }
}