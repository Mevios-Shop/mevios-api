import { AtualizarStatusRastreamentovendaDto } from './dto/atualizar-status-rastreamento-venda.dto';
import { InserirStatusRastreamentoVendaDto } from './dto/inserir-status-rastreamento-venda.dto';
import { StatusRastreamentoVenda } from './entities/status-rastreamento-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class StatusRastreamentoVendaService {

    constructor(
        @InjectRepository(StatusRastreamentoVenda)
        private statusRastreamentoVendaRepository: Repository<StatusRastreamentoVenda>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarStatusRastreamentoVenda(user: any): Promise<StatusRastreamentoVenda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusRastreamentoVendaRepository
                .createQueryBuilder('status_rastreamento_venda')
                .getMany()
        } else {
            return null
        }
    }

    async buscarStatusRastreamentoVendaPorId(id: number, user: any): Promise<StatusRastreamentoVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusRastreamentoVendaRepository
                .createQueryBuilder('status_rastreamento_venda')
                .where('status_rastreamento_venda.id = :id', { id })
                .getOne()
        } else {
            return null
        }
    }

    async inserir(inserirStatusVendaDto: InserirStatusRastreamentoVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const statusRastreamentoVenda = await this.statusRastreamentoVendaRepository.create(inserirStatusVendaDto)

            return await this.statusRastreamentoVendaRepository.save(statusRastreamentoVenda)
        } else {
            return null
        }
    }

    async atualizar(id: number, atualizarStatusVendaDto: AtualizarStatusRastreamentovendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.statusRastreamentoVendaRepository.update({ id: id }, atualizarStatusVendaDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(StatusRastreamentoVenda, id)
            }

            return await this.statusRastreamentoVendaRepository.findOneBy({ id })
        }
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.statusRastreamentoVendaRepository.delete({ id: id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(StatusRastreamentoVenda, id)
            }
        }
    }
}
