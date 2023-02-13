/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ItemCompraService } from '../itens_compra/item_compra/item-compra.service';
import { ComprasService } from './compras.service';

@Controller('compra-por-status')
export class CompraPorStatusController {

    constructor(private comprasService: ComprasService) {

    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    buscarCompraPorId(@Param() params, @Request() req) {
        return this.comprasService.buscarPorStatusCompraId(Number(params.id), req.user)
    }
}
