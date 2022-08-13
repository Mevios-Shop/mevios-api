import { AtualizarSkuProdutoDto } from './dto/atualizar-sku-produto.dto';
import { InserirSkuProdutoDto } from './dto/inserir-sku-produto.dto';
import { SkuProduto } from './entities/sku-produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository, EntityNotFoundError } from 'typeorm';

@Injectable()
export class SkuProdutoService {

    constructor(@InjectRepository(SkuProduto) private skuProdutoRepository: Repository<SkuProduto>) {}

    buscarTodos(): Promise<SkuProduto[]> {
        return this.skuProdutoRepository.find()
    }

    buscarPorId(id: number): Promise<SkuProduto> {
        return this.skuProdutoRepository.findOneBy({id})
    }

    buscarVariacaoPorSku(sku: string, plataformaId: number): Promise<SkuProduto> {
        return this.skuProdutoRepository.findOne({ where: { sku: sku, plataforma: plataformaId }})
    }

    inserir(inserirSkuProdutoDto: InserirSkuProdutoDto) {
        const estoque = this.skuProdutoRepository.create(inserirSkuProdutoDto)
        return this.skuProdutoRepository.save(estoque)
    }

    async atualizar(id: number,atualizarSkuProdutoDto: AtualizarSkuProdutoDto) {
        const resultadoAtualizacao = this.skuProdutoRepository.update(id, atualizarSkuProdutoDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(SkuProduto, id)
        }
        return this.skuProdutoRepository.findOneBy({id})
    }

    async deletar(id: number): Promise<any>{

        const resultadoDelecao = await this.skuProdutoRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(SkuProduto, id)
        }
    }
}
