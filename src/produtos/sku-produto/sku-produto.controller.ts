import { AtualizarSkuProdutoDto } from './dto/atualizar-sku-produto.dto';
import { SkuProduto } from './entities/sku-produto.entity';
import { InserirSkuProdutoDto } from './dto/inserir-sku-produto.dto';
import { SkuProdutoService } from './sku-produto.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('sku_produto')
export class SkuProdutoController {

    constructor(private skuProdutoService: SkuProdutoService) {}

    @Post()
    inserir(@Body() inserirSkuProdutoDto: InserirSkuProdutoDto) {
        return this.skuProdutoService.inserir(inserirSkuProdutoDto)
    }

    @Get()
    buscar(): Promise<SkuProduto[]> {
        return this.skuProdutoService.buscarTodos()
    }

    @Get(':id')
    buscarPorId(@Param() params): Promise<SkuProduto> {
        return this.skuProdutoService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarSkuProdutoDto: AtualizarSkuProdutoDto) {
        return this.skuProdutoService.atualizar(+id, atualizarSkuProdutoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.skuProdutoService.deletar(+id)
    }
}
