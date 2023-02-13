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

    async buscar(user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .orderBy('variacao_produto.descricao', 'ASC')
                .getMany()
        }
        return null
    }

    async buscarPorId(id: number, user: any): Promise<VariacaoProduto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .where("variacao_produto.id = :id", { id: id })
                .getOne()
        }
        return null
    }

    async buscarPorIdProduto(produtoId: number, user: any): Promise<VariacaoProduto[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.variacaoProdutoRepository
                .createQueryBuilder("variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .where("variacao_produto.produtoId = :produtoId", { produtoId: produtoId })
                .orderBy('variacao_produto.descricao', 'ASC')
                .getMany()
        }
        return null
    }

    async inserir(inserirVariacaoProdutoDto: InserirVariacaoProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const variacaoProduto = this.variacaoProdutoRepository.create(inserirVariacaoProdutoDto)
            return await this.variacaoProdutoRepository.save(variacaoProduto)
        }
        return null
    }

    async atualizar(id: number, atualizarVariacaoProdutoDto: AtualizarVariacaoProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.variacaoProdutoRepository.update({ id: id }, atualizarVariacaoProdutoDto)
            if (resultadoAtualizacao.affected > 0) {
                return await this.variacaoProdutoRepository.findOneBy({ id: id })
            }
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.variacaoProdutoRepository.delete({ id: id })
            if (resultadoDelecao.affected > 0) {
                return true
            }
            throw new EntityNotFoundError(VariacaoProduto, id)
        }
    }
}
