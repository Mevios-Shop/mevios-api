/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarVariacaoProdutoDto } from './dto/atualizar-variacao-produto.dto';
import { InserirVariacaoProdutoDto } from './dto/inserir-variacao-produto.dto';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { VariacaoProdutoService } from './variacao-produto.service';

@Controller('variacao_produto')
export class VariacaoProdutoController {

    constructor(private variacaoProdutoService: VariacaoProdutoService) {
        
    }

    @Post()
    inserir(@Body() inserirVaridacaoProdutoDto: InserirVariacaoProdutoDto) {
        return this.variacaoProdutoService.inserir(inserirVaridacaoProdutoDto)
    }

    @Get()
    buscarVariacoes(): Promise<VariacaoProduto[]> {
        return this.variacaoProdutoService.buscarVariacoes()
    }
 
    @Get(':id')
    buscarVariacaoPorId(@Param() params) {
        return this.variacaoProdutoService.buscarVariacaoPorId(params.id)
    }
    
    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarVariacaoProdutoDto: AtualizarVariacaoProdutoDto) {
        return this.variacaoProdutoService.atualizar(+id, atualizarVariacaoProdutoDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.variacaoProdutoService.deletar(id)
    }
}