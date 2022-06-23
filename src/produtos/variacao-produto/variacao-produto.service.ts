/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarVariacaoProdutoDto } from './dto/atualizar-variacao-produto.dto';
import { InserirVariacaoProdutoDto } from './dto/inserir-variacao-produto.dto';
import { VariacaoProduto } from './entities/variacao-produto.entity';

@Injectable()
export class VariacaoProdutoService {

    constructor(@InjectRepository(VariacaoProduto) private variacaoProdutoRepository: Repository<VariacaoProduto>) {
        
    }

    buscarVariacoes() {
        return this.variacaoProdutoRepository.find({
            order: {
                descricao: "ASC"
            }
        })
    }

    buscarVariacaoPorId(id: string): Promise<VariacaoProduto> {
        return this.variacaoProdutoRepository.findOne(id)
    }

    buscarVariacoesPorIdProduto(produtoId: string): Promise<VariacaoProduto[]>{
        
        return this.variacaoProdutoRepository.find({ 
            where: { 
                produto: `${produtoId}` 
            },
            order: {
                descricao: "ASC"
            }
        })
    }

    inserir(inserirVariacaoProdutoDto: InserirVariacaoProdutoDto) {
        const variacaoProduto = this.variacaoProdutoRepository.create(inserirVariacaoProdutoDto)
        return this.variacaoProdutoRepository.save(variacaoProduto)
    }

    async atualizar(id: number,atualizarVariacaoProdutoDto: AtualizarVariacaoProdutoDto) {
        const resultadoAtualizacao = this.variacaoProdutoRepository.update(id, atualizarVariacaoProdutoDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
        return this.variacaoProdutoRepository.findOne(id)
    }

    async deletar(id: string) {

        const resultadoDelecao = await this.variacaoProdutoRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
    }
}
