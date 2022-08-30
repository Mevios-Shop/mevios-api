/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarStatusCompraDto } from './dto/atualizar-status-compra.dto';
import { InserirStatusCompraDto } from './dto/inserir-status-compra.dto';
import { StatusCompra } from './entities/status-compra.entity';

@Injectable()
export class StatusCompraService {

    constructor(
        @InjectRepository(StatusCompra) private statusCompraRepository: Repository<StatusCompra>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarStatusCompra(user: any): Promise<StatusCompra[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusCompraRepository.find()
        }
        return null
    }

    async buscarStatusCompraPorId(id: number, user: any): Promise<StatusCompra> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusCompraRepository.findOneBy({ id: id })
        }
        return null
    }

    async inserir(inserirStatusCompraDto: InserirStatusCompraDto, user: any) {

        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const status_compra = await this.statusCompraRepository.create(inserirStatusCompraDto)
            return await this.statusCompraRepository.save(status_compra)
        }
        return null
    }

    async atualizar(id: number, atualizarStatusCompraDto: AtualizarStatusCompraDto, user: any) {

        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = this.statusCompraRepository.update({ id: id }, atualizarStatusCompraDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(StatusCompra, id)
            }
            return this.statusCompraRepository.findOneBy({ id })
        }
        return null
    }

    async deletar(id: number, user: any) {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.statusCompraRepository.delete({ id: id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(StatusCompra, id)
            }
        }
        return null
    }

}
