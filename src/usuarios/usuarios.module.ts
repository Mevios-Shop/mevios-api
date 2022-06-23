import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [ UsuarioController ],
    providers: [ UsuarioService ],
    exports: [ UsuarioService ]
})
export class UsuariosModule {}
