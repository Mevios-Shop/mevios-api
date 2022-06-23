/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CartaoCreditoService } from './cartao-credito.service';
import { AtualizarCartaoCreditoDto } from './dto/atualizar-cartao-credito.dto';
import { InserirCartaoCreditoDto } from './dto/inserir-cartao-credito.dto';

@Controller('cartao_credito')
export class CartaoCreditoController {

    constructor(private cartaoCreditoService: CartaoCreditoService) {
        
    }

    @Post()   
    inserir(@Body() inserirCartaoCreditoDto: InserirCartaoCreditoDto) {
        return this.cartaoCreditoService.inserir(inserirCartaoCreditoDto)
    }

    @Get()
    buscar() {
        return this.cartaoCreditoService.buscar()
    }

    @Get(':id')
    buscarPorId(@Param() params) {
        return this.cartaoCreditoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarCartaoCreditoDto: AtualizarCartaoCreditoDto) {
        return this.cartaoCreditoService.atualizar(id, atualizarCartaoCreditoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.cartaoCreditoService.deletar(id)
    }
}
