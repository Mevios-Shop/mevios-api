/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { StatusVendaService } from './status-venda.service';

@Controller('status_venda_por_descricao')
export class StatusVendaPorDescricaoController { 

    constructor(private statusVendaService: StatusVendaService) {
        
    }

    @Get(':descricao')
    @UseGuards(JwtAuthGuard)
    async buscarStatusVendaPorId(@Param() params, @Request() req) {
        return await this.statusVendaService.buscarStatusVendaPorDescricao(params.descricao, req.user)
    }
}
