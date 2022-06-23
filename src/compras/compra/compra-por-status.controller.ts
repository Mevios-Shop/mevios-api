/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ItemCompraService } from '../itens_compra/item_compra/item-compra.service';
import { ComprasService } from './compras.service';

@Controller('compra-por-status')
export class CompraPorStatusController {

    constructor(
        private comprasService: ComprasService,
        private itemCompraService: ItemCompraService
    ) {
        
    }
    
    @Get(':id')
    buscarCompraPorId(@Param() params) {
        return this.comprasService.buscarComprasPorStatusCompraId(params.id)
    }
}
