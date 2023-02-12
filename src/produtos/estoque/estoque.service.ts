import { InserirEstoqueDto } from './dto/inserir-estoque.dto';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';
import { Estoque } from './entities/estoque.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository, EntityNotFoundError, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class EstoqueService {

    constructor(
        @InjectRepository(Estoque)
        private estoqueRepository: Repository<Estoque>,
        private connection: Connection,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) { }

    async buscar(user: any): Promise<Estoque[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.estoqueRepository
                .createQueryBuilder("estoque")
                .leftJoinAndSelect("estoque.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("estoque.item_compra", "item_compra")
                .where("estoque.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getMany()
        }
    }

    async buscarPorId(id: number, user: any): Promise<Estoque> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.estoqueRepository
                .createQueryBuilder("estoque")
                .leftJoinAndSelect("estoque.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("estoque.item_compra", "item_compra")
                .where("estoque.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .andWhere("estoque.id = :id", { id: id })
                .getOne()
        }
    }

    async buscarProdutosDisponiveisAgrupados(user: any): Promise<any[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            return await this.estoqueRepository.query(
                `SELECT 
                    p.nome AS 'nome',
                    vp.descricao AS 'descricao',
                    e.variacaoProdutoId AS 'variacaoProdutoId',
                    COUNT(e.variacaoProdutoId) AS 'quantidade'
                FROM
                    (((bd_api_vendas.estoque e
                    LEFT JOIN bd_api_vendas.item_venda iv ON ((iv.estoqueId = e.id)))
                    JOIN bd_api_vendas.variacao_produto vp ON ((vp.id = e.variacaoProdutoId)))
                    JOIN bd_api_vendas.produto p ON ((p.id = vp.produtoId)))
                WHERE
                    e.id IN (SELECT 
                            bd_api_vendas.item_venda.estoqueId
                        FROM
                            bd_api_vendas.item_venda)
                        IS FALSE
                    AND e.usuarioId = ${usuario.id}
                GROUP BY e.variacaoProdutoId
                ORDER BY p.nome;`
            )
        }
        return null


    }

    async buscarProdutoDisponivelPorVariacaoId(variacaoProdutoId: number, user: any): Promise<Estoque> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.estoqueRepository
                .createQueryBuilder("estoque")
                .leftJoinAndSelect("estoque.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("estoque.item_compra", "item_compra")
                .where("estoque.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .andWhere("estoque.variacaoProdutoId = :variacaoProdutoId", { variacaoProdutoId: variacaoProdutoId })
                .andWhere("estoque.id NOT IN (SELECT estoqueId FROM bd_api_vendas.item_venda)")
                .getOne()
        }
    }

    async buscarProdutosDisponiveisPorVariacaoId(variacaoId: number, quantidade: number, user: any): Promise<Estoque[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.estoqueRepository
                .createQueryBuilder("estoque")
                .leftJoinAndSelect("estoque.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("estoque.item_compra", "item_compra")
                .where("estoque.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .andWhere("estoque.variacaoProdutoId = :variacaoProdutoId", { variacaoProdutoId: variacaoId })
                .andWhere("estoque.id NOT IN (SELECT estoqueId FROM item_venda)")
                .limit(quantidade)
                .getMany()
        }

        return null
    }

    async inserir(inserirEstoqueDto: InserirEstoqueDto[], user: any): Promise<Estoque[]> {
        console.log('EstoqueService:inserir...')
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirEstoqueDto.forEach((item) => {
                item.usuario = usuario.id
            })
            const itens = await this.estoqueRepository.create(inserirEstoqueDto)
            return await this.estoqueRepository.save(itens)
        }
        return null
    }

    async atualizar(id: number, atualizarProdutoDto: AtualizarEstoqueDto, user: any): Promise<Estoque> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.estoqueRepository.update({ id: id, usuario: usuario.id }, atualizarProdutoDto)
            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(Estoque, id)
            }
            return await this.estoqueRepository.findOneBy({ id })
        }
        return null
    }

    async deletar(id: number, user: any): Promise<any> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.estoqueRepository.delete({ id: id, usuario: usuario.id })
            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(Estoque, id)
            }
            return null
        }
    }
}
