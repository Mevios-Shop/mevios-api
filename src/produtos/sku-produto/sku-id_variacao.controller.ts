import { SkuProduto } from './entities/sku-produto.entity';
import { SkuProdutoService } from './sku-produto.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller("sku_id_variacao")
export class SkuId_variacaoController {

    constructor(private skuProdutoService: SkuProdutoService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarPorSku(@Body() body, @Request() req): Promise<SkuProduto> {
        
        return await this.skuProdutoService.buscarVariacaoPorSku(body['sku'], body['plataformaId'], req.user).then(
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
