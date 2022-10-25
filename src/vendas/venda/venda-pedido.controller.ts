import { VendaService } from './venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('venda_pedido')
export class VendaPedidoController {

    constructor(private VendasService: VendaService) {}

    @Get(':codigo_pedido')
    @UseGuards(JwtAuthGuard)
    async buscarVendaPorId(@Param() params, @Request() req) {
        return await this.VendasService.buscarVendaPorPedido(params.codigo_pedido, req.user).then(
            ((resposta: any) => {
                if (resposta) {
                    return resposta
                } else {
                    return { "mensagem": "Pedido não encontrado!" }
                }
            })
        )
    }
}
