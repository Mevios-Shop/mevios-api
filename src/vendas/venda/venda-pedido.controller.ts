import { VendaService } from './venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';

@Controller('venda_pedido')
export class VendaPedidoController {

    constructor(private VendasService: VendaService) {}

    @Get(':codigo_pedido')
    buscarVendaPorId(@Param() params) {
        return this.VendasService.buscarVendaPorPedido(params.codigo_pedido).then(
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
