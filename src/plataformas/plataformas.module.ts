import { PlataformasService } from './plataformas.service';
import { PlataformasController } from './plataformas.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformaDescricaoController } from './plataforma-descricao.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Plataforma])],
    controllers: [
        PlataformasController,
        PlataformaDescricaoController
    ],
    providers: [
        PlataformasService,],
})
export class PlataformasModule { }
