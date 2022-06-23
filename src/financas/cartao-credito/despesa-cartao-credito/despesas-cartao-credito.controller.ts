/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { DespesaCartaoCreditoService } from './despesa-cartao-credito.service';

@Controller("despesas_cartao")
export class DespesasCartaoCreditoController { 

    constructor(private despesaCartaoCreditoService: DespesaCartaoCreditoService) {
        
    }

    @Get(':cartao_creditoId')
    buscarPorIdCartao(@Param() params) {
        return this.despesaCartaoCreditoService.buscarPorIdCartao(params.cartao_creditoId)
    }
}
