import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Usuario]),
        forwardRef(() => AuthModule)
    ],
    controllers: [ UsuarioController ],
    providers: [ UsuarioService ],
    exports: [ UsuarioService ]
})
export class UsuariosModule {}
