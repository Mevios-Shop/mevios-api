import { PlataformasService } from './plataformas.service';
import { PlataformasController } from './plataformas.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformaDescricaoController } from './plataforma-descricao.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
    imports: [TypeOrmModule.forFeature([Plataforma]), forwardRef(() => UsuariosModule)],
    controllers: [
        PlataformasController,
        PlataformaDescricaoController
    ],
    providers: [
        PlataformasService,],
})
export class PlataformasModule { }
