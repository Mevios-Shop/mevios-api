/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { InserirProdutoDto } from './dto/inserir-produto.dto';
import { Produto } from './entities/produto.entity';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {

    constructor(private produtosService: ProdutosService) {
        
    }

    @Post()
    inserir(@Body() inserirProdutoDto: InserirProdutoDto) {
        return this.produtosService.inserir(inserirProdutoDto)
    }

    //@UseGuards(LocalAuthGuard)
    @Get()
    buscarProdutos(): Promise<Produto[]> {
        return this.produtosService.buscarTodos()
    }

    @Get(':id')
    buscarProduto(@Param() params): Promise<Produto> {
        return this.produtosService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarProdutoDto: AtualizarProdutoDto) {
        return this.produtosService.atualizar(+id, atualizarProdutoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.produtosService.deletar(+id)
    }

    
}