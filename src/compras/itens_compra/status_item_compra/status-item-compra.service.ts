/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarStatusItemCompraDto } from './dto/atualizar-status-item-compra.dto';
import { InserirStatusItemCompraDto } from './dto/inserir-status-item-compra.dto';
import { StatusItemCompra } from './entities/status-item-compra.entity';

@Injectable()
export class StatusItemCompraService {

    constructor(
        @InjectRepository(StatusItemCompra) private statusItemCompraRepository: Repository<StatusItemCompra>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarStatusItemCompra(user: any): Promise<StatusItemCompra[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusItemCompraRepository.find()
        }
    }

    async buscarStatusItemCompraPorId(id: number, user: any): Promise<StatusItemCompra> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusItemCompraRepository.findOneBy({ id })
        }
    }

    async inserir(inserirStatusItemCompraDto: InserirStatusItemCompraDto, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            const STATUS_ITEM_COMPRA = await this.statusItemCompraRepository.create(inserirStatusItemCompraDto)
            return await this.statusItemCompraRepository.save(STATUS_ITEM_COMPRA)
        }
        return null
    }

    async atualizar(id: number, atualizarStatusItemCompraDto: AtualizarStatusItemCompraDto, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const RESULTADO_ATUALIZACAO = await this.statusItemCompraRepository.update(
                {
                    id: id
                },
                atualizarStatusItemCompraDto)

            if (!(await RESULTADO_ATUALIZACAO).affected) {
                throw new EntityNotFoundError(StatusItemCompra, id)
            }

            return await this.statusItemCompraRepository.findOneBy({ id })
        }
        return null
    }

    async deletar(id: number, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const RESULTADO_DELECAO = await this.statusItemCompraRepository.delete({ id: id })

            if (!(await RESULTADO_DELECAO).affected) {
                throw new EntityNotFoundError(StatusItemCompra, id)
            }
        }
        return null
    }

}
