import { InserirEstoqueDto } from './dto/inserir-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';
import { Estoque } from './entities/estoque.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository, EntityNotFoundError, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstoqueService { 

    constructor(@InjectRepository(Estoque) private produtoRepository: Repository<Estoque>, private connection: Connection) { }

    buscarTodos(): Promise<Estoque[]> {
        return this.produtoRepository.find()
    }

    buscarPorId(id: number): Promise<Estoque> {
        return this.produtoRepository.findOneBy({id})
    }

    buscar_produtos_disponiveis_agrupados(): Promise<any[]> {
        const queryRunner = this.connection.createQueryRunner()

        return queryRunner.query("SELECT * FROM bd_api_vendas.produtos_em_estoque_agrupados;").then(
            ((resposta: any) => {
                queryRunner.release()

                return resposta
            })
        )
        
    }

    buscarProdutosDisponiveisPorVariacaoId(variacaoId: number, quantidade: number): Promise<Estoque> {

        const queryRunner = this.connection.createQueryRunner()

        

        return queryRunner.query("SELECT E.id FROM bd_api_vendas.estoque AS E LEFT JOIN bd_api_vendas.item_venda AS iv ON iv.estoqueId = E.id INNER JOIN bd_api_vendas.variacao_produto	AS VP ON vp.id = E.variacaoProdutoId INNER JOIN bd_api_vendas.produto AS P ON P.id = VP.produtoId WHERE E.id not in(SELECT estoqueId from bd_api_vendas.item_venda) AND E.variacaoProdutoId = " + variacaoId +" ORDER BY	E.data LIMIT " + quantidade + ";").then(
            ((resposta: any) => {

                queryRunner.release()

                return resposta

            })
        )
    }

    inserir(inserirProdutoDto: InserirEstoqueDto[]) {
        const ITENS = this.produtoRepository.create(inserirProdutoDto)
        return this.produtoRepository.save(ITENS)
    }

    async atualizar(id: number,atualizarProdutoDto: AtualizarEstoqueDto) {
        const resultadoAtualizacao = this.produtoRepository.update(id, atualizarProdutoDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Estoque, id)
        }
        return this.produtoRepository.findOneBy({id})
    }

    async deletar(id: number): Promise<any>{

        const resultadoDelecao = await this.produtoRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Estoque, id)
        }
    }
}
