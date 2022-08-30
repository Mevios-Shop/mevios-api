/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformasService } from './plataformas.service';

@Controller('plataforma-descricao')
export class PlataformaDescricaoController { 
    constructor(private plataformasService: PlataformasService) { }

    @Get(':descricao')
    @UseGuards(JwtAuthGuard)
    async buscarPlataforma(@Param() params, @Request() req): Promise<Plataforma> {
        return await this.plataformasService.buscarPorDescricao(params.descricao, req.user)
    }
}
