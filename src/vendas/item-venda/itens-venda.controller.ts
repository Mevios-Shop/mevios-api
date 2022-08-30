/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ItemVendaService } from './item-venda.service';

@Controller('itens_venda')
export class ItensVendaController {

    constructor(private itemVendaService: ItemVendaService) {
        
    }

    @Get(':vendaId')
    @UseGuards(JwtAuthGuard)
    async buscarPorIdCompra(@Param() params, @Request() req) {
        return await this.itemVendaService.buscarPorIdVenda(params.vendaId, req.user)
    }
}
