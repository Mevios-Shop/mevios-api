import { DespesaDebitoService } from './despesa-debito.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';

@Controller('despesas_debito')
export class DespesasDebitoController {

    constructor(private despesaDebitoService: DespesaDebitoService) {
        
    }

    @Get(':conta_bancariaId')
    buscarPorIdCartao(@Param() params) {
        return this.despesaDebitoService.buscarPorIdContaBancaria(params.conta_bancariaId)
    }
}
