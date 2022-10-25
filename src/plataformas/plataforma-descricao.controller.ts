/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformasService } from './plataformas.service';

@Controller('plataforma-descricao')
export class PlataformaDescricaoController { 
    constructor(private plataformasService: PlataformasService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarPlataforma(@Body() body, @Request() req): Promise<Plataforma> {
        return await this.plataformasService.buscarPorDescricao(body['descricao'], req.user)
    }
}
