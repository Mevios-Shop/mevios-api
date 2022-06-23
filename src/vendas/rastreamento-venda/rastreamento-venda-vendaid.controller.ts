/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { RastreamentoVendaService } from './rastreamento-venda.service';

@Controller('rastreamento_venda_por_vendaid')
export class RastreamentoVendaPorvendaIDController {

    constructor(private rastreamentoVendaService: RastreamentoVendaService) {
        
    }
    
    @Get(':id')
    buscarPorId(@Param() params) {
        return this.rastreamentoVendaService.buscarPorVendaId(params.id)
    }

}
