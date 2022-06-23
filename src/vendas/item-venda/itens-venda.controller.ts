/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ItemVendaService } from './item-venda.service';

@Controller('itens_venda')
export class ItensVendaController {

    constructor(private itemVendaService: ItemVendaService) {
        
    }

    @Get(':vendaId')
    buscarPorIdCompra(@Param() params) {
        return this.itemVendaService.buscarPorIdVenda(params.vendaId)
    }
}
