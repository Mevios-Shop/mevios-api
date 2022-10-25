import { AtualizarItemVendaDto } from './dto/atualizar-item-venda.dto';
import { InserirItemVendaDto } from './dto/inserir-item-venda.dto';
import { ItemVenda } from './entities/item-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class ItemVendaService {

    constructor(
        @InjectRepository(ItemVenda) private itemVendaRepository: Repository<ItemVenda>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarPorIdVenda(vendaId: number, user: any): Promise<ItemVenda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.itemVendaRepository
                .createQueryBuilder("item_venda")
                .leftJoinAndSelect("item_venda.estoque", "estoque")
                .leftJoinAndSelect("item_venda.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("item_venda.venda", "venda")
                .where("item_venda.vendaId = :vendaId", { vendaId: vendaId })
                .andWhere("venda.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getMany()
        }
        return null
    }

    async buscarPorId(id: number, user: any): Promise<ItemVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.itemVendaRepository
                .createQueryBuilder("item_venda")
                .leftJoinAndSelect("item_venda.estoque", "estoque")
                .leftJoinAndSelect("item_venda.variacao_produto", "variacao_produto")
                .leftJoinAndSelect("item_venda.venda", "venda")
                .where("item_venda.id = :id", { id: id })
                .andWhere("venda.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getOne()
        }
        return null
    }

    async inserir(inserirItemVendaDto: InserirItemVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirItemVendaDto.usuario = usuario.id
            const itemVenda = this.itemVendaRepository.create(inserirItemVendaDto)
            return await this.itemVendaRepository.save(itemVenda)
        }
        return null
    }

    async atualizar(id: number, atualizarItemCompraDto: AtualizarItemVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = this.itemVendaRepository.update({ id: id, usuario: usuario.id }, atualizarItemCompraDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(ItemVenda, id)
            }

            return this.itemVendaRepository.findOneBy({ id })
        }
        return null
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            const resultadoDelecao = this.itemVendaRepository.delete({ id: id, usuario: usuario.id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(ItemVenda, id)
            }
        }
    }
}
