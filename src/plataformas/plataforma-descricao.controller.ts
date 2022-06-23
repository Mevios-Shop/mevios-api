/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformasService } from './plataformas.service';

@Controller('plataforma-descricao')
export class PlataformaDescricaoController { 
    constructor(private plataformasService: PlataformasService) { }

    @Get(':descricao')
    buscarPlataforma(@Param() params): Promise<Plataforma> {
        return this.plataformasService.buscarPorDescricao(params.descricao)
    }
}
