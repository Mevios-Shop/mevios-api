import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email }
    }
}