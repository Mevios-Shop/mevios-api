import { SkuProduto } from './entities/sku-produto.entity';
import { SkuProdutoService } from './sku-produto.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param, Get, Body } from '@nestjs/common';

@Controller("sku_id_variacao")
export class SkuId_variacaoController {

    constructor(private skuProdutoService: SkuProdutoService) {}

    @Get()
    buscarPorSku(@Body() body): Promise<SkuProduto> {
        
        return this.skuProdutoService.buscarVariacaoPorSku(body['sku'], body['plataformaId']).then(
            ((resposta: any) => {
                if (resposta) {
                    return resposta
                } else {
                    return { "mensagem": "SKU não encontrado!" }
                }
            })
        )
    }
}
