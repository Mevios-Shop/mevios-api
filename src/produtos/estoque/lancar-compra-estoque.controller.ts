/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ComprasService } from 'src/compras/compra/compras.service';
import { EstoqueService } from './estoque.service';

@Controller()
export class LancarCompraEstoqueController {

    constructor(
        private estoqueService: EstoqueService
    ) {
        
    }

    @Get(':id')
    buscarCompraPorId(@Param() params) {
        //return this.estoqueService.lancarCompra(params.id)
    }
}
