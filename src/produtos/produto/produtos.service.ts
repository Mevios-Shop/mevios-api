/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { InserirProdutoDto } from './dto/inserir-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService { 

    constructor(@InjectRepository(Produto) private produtoRepository: Repository<Produto>) { }

    buscarTodos(): Promise<Produto[]> {
        return this.produtoRepository.find({
            "where": {
                habilitado: 1
            },
            order: {
                nome: "ASC"
            }
        })
    }

    buscarPorId(id: number): Promise<Produto> {
        return this.produtoRepository.findOne(id, {"where": {habilitado: 1}})
    }

    inserir(inserirProdutoDto: InserirProdutoDto) {
        const produto = this.produtoRepository.create(inserirProdutoDto)
        return this.produtoRepository.save(produto)
    }

    async atualizar(id: number,atualizarProdutoDto: AtualizarProdutoDto) {
        const resultadoAtualizacao = this.produtoRepository.update(id, atualizarProdutoDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Produto, id)
        }
        return this.produtoRepository.findOne(id)
    }

    async deletar(id: number): Promise<any>{

        let atualizarProdutoDto: AtualizarProdutoDto = await this.produtoRepository.findOne(id)
        
        if (!atualizarProdutoDto) {
            throw new EntityNotFoundError(Produto, id)
        }
        
        atualizarProdutoDto.habilitado = false

        return this.atualizar(id, atualizarProdutoDto)
    }
}
