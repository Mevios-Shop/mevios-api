/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { MovimentacaoBancariaService } from './movimentacao-bancaria.service';

@Controller('movimentacoes_bancaria')
export class MovimentacoesBancariaController { 

    constructor(private movimentacaoBancariaService: MovimentacaoBancariaService) {
        
    }

    @Get(':contaBancariaId')
    buscarPorId(@Param() params) {
        return this.movimentacaoBancariaService.buscarPorIdContaBancaria(params.contaBancariaId)
    }
}
