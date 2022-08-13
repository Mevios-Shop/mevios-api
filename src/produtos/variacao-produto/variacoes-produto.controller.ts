/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { VariacaoProdutoService } from './variacao-produto.service';

@Controller('variacoes_produto')
export class VariacoesProdutoController {

    constructor(private variacaoProdutoService: VariacaoProdutoService) {
        
    }
    
    @Get(':produtoId')
    buscarVariacoesPorProduto(@Param('produtoId') produtoId: string): Promise<VariacaoProduto[]> {
        return this.variacaoProdutoService.buscarVariacoesPorIdProduto(Number(produtoId))
    }
}
