/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { Estoque } from './entities/estoque.entity';
import { EstoqueService } from './estoque.service';

@Controller('estoque_disponivel')
export class EstoqueDisponivelController {

    constructor(private estoqueService: EstoqueService) {
        
    }

    @Get(':id/:quantidade')
    buscarProdutosDisponiveisPorVariacaoId(@Param() params): Promise<Estoque[]> {
        return this.estoqueService.buscarProdutosDisponiveisPorVariacaoId(params.id, params.quantidade).then(
            ((resposta: any) => {
                let contador: any = 0
                for (let i = 0; i < resposta.length; i++) {
                    contador++
                    
                }

                if (contador == params.quantidade) {
                    return resposta
                } else {
                    return { "mensagem" : "Estoque insuficiente!"}
                }
                
            })
        )
    }

    @Get()
    buscar_produtos_disponiveis_agrupados(): Promise<any[]> {
        return this.estoqueService.buscar_produtos_disponiveis_agrupados()
    }
}
