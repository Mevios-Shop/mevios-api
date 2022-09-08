/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarVariacaoProdutoDto } from './dto/atualizar-variacao-produto.dto';
import { InserirVariacaoProdutoDto } from './dto/inserir-variacao-produto.dto';
import { VariacaoProduto } from './entities/variacao-produto.entity';

@Injectable()
export class VariacaoProdutoService {

    constructor(
        @InjectRepository(VariacaoProduto) private variacaoProdutoRepository: Repository<VariacaoProduto>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarVariacoes(user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .where("variacao_produto.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .orderBy('variacao_produto.descricao', 'ASC')
                .getMany()
        }
        return null
    }

    async buscarVariacaoPorId(id: number, user: any): Promise<VariacaoProduto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .where("variacao_produto.id = :id", { id: id })
                .andWhere("variacao_produto.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getOne()
        }
        return null
    }

    async buscarVariacoesPorIdProduto(produtoId: number, user: any): Promise<VariacaoProduto[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .where("variacao_produto.produtoId = :produtoId", { produtoId: produtoId })
                .andWhere("variacao_produto.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .orderBy('variacao_produto.descricao', 'ASC')
                .getMany()
        }
        return null
    }

    async inserir(inserirVariacaoProdutoDto: InserirVariacaoProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirVariacaoProdutoDto.usuario = usuario.id
            const variacaoProduto = this.variacaoProdutoRepository.create(inserirVariacaoProdutoDto)
            return await this.variacaoProdutoRepository.save(variacaoProduto)
        }
        return null
    }

    async atualizar(id: number, atualizarVariacaoProdutoDto: AtualizarVariacaoProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.variacaoProdutoRepository.update({ id: id, usuario: usuario.id }, atualizarVariacaoProdutoDto)
            if (resultadoAtualizacao.affected > 0) {
                return await this.variacaoProdutoRepository.findOneBy({id: id, usuario: usuario.id})
            }
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
        /*
        const resultadoAtualizacao = await this.variacaoProdutoRepository.update(id, atualizarVariacaoProdutoDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
        return this.variacaoProdutoRepository.findOneBy({ id })*/
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.variacaoProdutoRepository.delete({ id: id, usuario: usuario.id })
            if (resultadoDelecao.affected > 0) {
                return true
            }
            throw new EntityNotFoundError(VariacaoProduto, id)
        }

        /*
        const resultadoDelecao = await this.variacaoProdutoRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(VariacaoProduto, id)
        }*/
    }
}
