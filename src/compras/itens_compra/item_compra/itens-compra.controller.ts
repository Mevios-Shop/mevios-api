/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultDto } from 'src/shared/result.dto';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompraService } from './item-compra.service';

@Controller('itens_compra')
export class ItensCompraController { 

    constructor(private itemCompraService: ItemCompraService) {
        
    }

    @Post()   
    @UseGuards(AuthGuard('jwt'))
    inserir(@Body() inserirItensCompraDto: InserirItemCompraDto, @Request() req) {
        return this.itemCompraService.inserirVarios(inserirItensCompraDto, req.user)
    }

    @Get(':compraId')
    @UseGuards(AuthGuard('jwt'))
    async buscarPorIdCompra(@Param() params, @Request() req) {
        try {
            return await this.itemCompraService.buscarPorIdCompra(Number(params.compraId), req.user)
        } catch (error) {
            throw new HttpException(
                new ResultDto(
                    'Não foi possível atualizar seus dados!',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete(':id_compra')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    deletar(@Param('id_compra') id_compra: number, @Request() req) {
        return this.itemCompraService.deletarPorIdCompra(id_compra, req.user)
    }
}
