/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { InserirProdutoDto } from './dto/inserir-produto.dto';
import { Produto } from './entities/produto.entity';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {

    constructor(private produtosService: ProdutosService) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirProdutoDto: InserirProdutoDto, @Request() req) {
        return await this.produtosService.inserir(inserirProdutoDto, req.user)
    }

    //@UseGuards(LocalAuthGuard)
    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarProdutos(@Request() req): Promise<Produto[]> {
        return await this.produtosService.buscar(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarProduto(@Param() params, @Request() req): Promise<Produto> {
        return await this.produtosService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarProdutoDto: AtualizarProdutoDto, @Request() req) {
        return await this.produtosService.atualizar(+id, atualizarProdutoDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: string, @Request() req) {
        return await this.produtosService.deletar(+id, req.user)
    }


}