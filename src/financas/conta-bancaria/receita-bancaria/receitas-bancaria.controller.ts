import { ReceitaBancariaService } from './receita-bancaria.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';

@Controller('receitas_bancaria')
export class ReceitasBancariaController {

    constructor(private receitaBancariaService: ReceitaBancariaService) {
        
    }

    @Get(':receita_bancariaId')
    buscarPorIdCartao(@Param() params) {
        return this.receitaBancariaService.buscarPorIdContaBancaria(params.receita_bancariaId)
    }
}
