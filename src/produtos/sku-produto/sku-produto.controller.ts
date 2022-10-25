import { AtualizarSkuProdutoDto } from './dto/atualizar-sku-produto.dto';
import { SkuProduto } from './entities/sku-produto.entity';
import { InserirSkuProdutoDto } from './dto/inserir-sku-produto.dto';
import { SkuProdutoService } from './sku-produto.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('sku_produto')
export class SkuProdutoController {

    constructor(private skuProdutoService: SkuProdutoService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirSkuProdutoDto: InserirSkuProdutoDto, @Request() req) {
        return await this.skuProdutoService.inserir(inserirSkuProdutoDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscar(@Request() req): Promise<SkuProduto[]> {
        return await this.skuProdutoService.buscarTodos(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPorId(@Param() params, @Request() req): Promise<SkuProduto> {
        return await this.skuProdutoService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarSkuProdutoDto: AtualizarSkuProdutoDto, @Request() req) {
        return await this.skuProdutoService.atualizar(+id, atualizarSkuProdutoDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: string, @Request() req) {
        return await this.skuProdutoService.deletar(+id, req.user)
    }
}
