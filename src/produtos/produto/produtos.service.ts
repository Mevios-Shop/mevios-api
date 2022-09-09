/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { InserirProdutoDto } from './dto/inserir-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {

    constructor(
        @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) { }

    async buscarTodos(user: any): Promise<Produto[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.produtoRepository
                .createQueryBuilder("produto")
                .where("produto.habilitado = :habilitado", { habilitado: true })
                .orderBy('produto.nome', 'ASC')
                .getMany()
        }
        return null
    }

    async buscarPorId(id: number, user: any): Promise<Produto> {
        let usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.produtoRepository
                .createQueryBuilder("produto")
                .where("produto.habilitado = :habilitado", { habilitado: true })
                .andWhere("produto.id = :id", { id: id })
                .getOne()
        }
        return null
    }

    async inserir(inserirProdutoDto: InserirProdutoDto, user: any): Promise<Produto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const produto = await this.produtoRepository.create(inserirProdutoDto)
            return await this.produtoRepository.save(produto)
        }
        return null
    }

    async atualizar(id: number, atualizarProdutoDto: AtualizarProdutoDto, user: any): Promise<Produto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.produtoRepository.update({ id: id }, atualizarProdutoDto)
            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(Produto, id)
            }
            return this.produtoRepository.findOneBy({ id })
        }
    }

    async deletar(id: number, user: any): Promise<any> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            let atualizarProdutoDto: AtualizarProdutoDto = await this.produtoRepository
                .createQueryBuilder("produto")
                .where("produto.habilitado = :habilitado", { habilitado: true })
                .andWhere("produto.id = :id", { id: id })
                .getOne()

            if (!atualizarProdutoDto) {
                throw new EntityNotFoundError(Produto, id)
            }

            atualizarProdutoDto.habilitado = false

            return await this.atualizar(id, atualizarProdutoDto, user)
        }

        return null
    }
}
