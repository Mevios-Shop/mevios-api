/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { VariacaoProdutoService } from './variacao-produto.service';

@Controller('variacoes_produto')
export class VariacoesProdutoController {

    constructor(private variacaoProdutoService: VariacaoProdutoService) {

    }

    @Get(':produtoId')
    @UseGuards(JwtAuthGuard)
    async buscarVariacoesPorProduto(@Param('produtoId') produtoId: string, @Request() req): Promise<VariacaoProduto[]> {
        return await this.variacaoProdutoService.buscarPorIdProduto(Number(produtoId), req.user)
    }
}
