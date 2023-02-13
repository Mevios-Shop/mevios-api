/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarItemCompraDto } from './dto/atualizar-item-compra.dto';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompra } from './entities/item-compra.entity';

@Injectable()
export class ItemCompraService {

    constructor(
        @InjectRepository(ItemCompra) private itemCompraRepository: Repository<ItemCompra>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarPorIdCompra(compraId: number, user: any): Promise<ItemCompra[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.itemCompraRepository
                .createQueryBuilder("item_compra")
                .leftJoinAndSelect("item_compra.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("variacao_produto.produto", "produto")
                .leftJoinAndSelect("item_compra.compra", "compra")
                .leftJoinAndSelect("item_compra.status_item_compra", "status_item_compra")
                .where("item_compra.compraId = :compraId", { compraId: compraId })
                .andWhere("item_compra.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getMany()
        }

        return null
    }

    async buscarPorId(id: number, user: any): Promise<ItemCompra> {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)
        if (usuario) {
            return await this.itemCompraRepository.findOneBy({ id })
        }
        return null
    }

    async inserir(inserirItemCompraDto: InserirItemCompraDto, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirItemCompraDto.usuario = usuario
            const item_compra = await this.itemCompraRepository.create(inserirItemCompraDto)
            return this.itemCompraRepository.save(item_compra)
        }

        return null
    }

    async inserirVarios(inserirItemCompraDto: InserirItemCompraDto, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            let itens_compra = []

            inserirItemCompraDto.usuario = usuario

            for (let index = 0; index < inserirItemCompraDto.quantidade; index++) {
                itens_compra.push(this.itemCompraRepository.create(inserirItemCompraDto))
            }

            let ITENS_COMPRA = this.itemCompraRepository.create(inserirItemCompraDto)

            return this.itemCompraRepository.save(itens_compra)
        }
    }

    async atualizar(id: number, atualizarItemCompraDto: AtualizarItemCompraDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = this.itemCompraRepository.update(
                {
                    id: id,
                    usuario: usuario.id
                },
                atualizarItemCompraDto
            )

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(ItemCompra, id)
            }

            return this.itemCompraRepository.findOneBy({ id })
        }
        return null
    }

    async deletarPorIdCompra(compraId: number, user: any) {

        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            const resultadoDelecao = await this.itemCompraRepository.delete({ compra: compraId, usuario: usuario.id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(ItemCompra, compraId)
            }

        }
        return null
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = this.itemCompraRepository.delete({
                id: id,
                usuario: usuario.id
            })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(ItemCompra, id)
            }
        }
        return null
    }
}
