/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Estoque } from './entities/estoque.entity';
import { EstoqueService } from './estoque.service';

@Controller('estoque_disponivel')
export class EstoqueDisponivelController {

    constructor(private estoqueService: EstoqueService) {

    }

    @Get(':variacaoProdutoId/:quantidade')
    @UseGuards(JwtAuthGuard)
    buscarProdutosDisponiveisPorVariacaoId(@Param() params, @Request() req): Promise<Estoque[]> {
        return this.estoqueService.buscarProdutosDisponiveisPorVariacaoId(params.variacaoProdutoId, params.quantidade, req.user).then(
            ((resposta: any) => {
                let contador: any = 0
                for (let i = 0; i < resposta.length; i++) {
                    contador++
                }

                console.log('lenght: ', resposta.length)

                if (contador == params.quantidade) {
                    return resposta
                } else {
                    return { "mensagem": "Estoque insuficiente!" }
                }

            })
        )
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscar_produtos_disponiveis_agrupados(@Request() req): Promise<any[]> {
        return await this.estoqueService.buscarProdutosDisponiveisAgrupados(req.user)
    }
}
