/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RastreamentoVendaService } from './rastreamento-venda.service';

@Controller('rastreamento_venda_por_vendaid')
export class RastreamentoVendaPorvendaIDController {

    constructor(private rastreamentoVendaService: RastreamentoVendaService) {
        
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req) {
        return await this.rastreamentoVendaService.buscarPorVendaId(params.id, req.user)
    }

}
