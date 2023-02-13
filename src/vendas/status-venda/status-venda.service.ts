import { InjectRepository } from '@nestjs/typeorm';
import { AtualizarStatusVendaDto } from './dto/atualizar-status-venda.dto';
import { InserirStatusVendaDto } from './dto/inserir-status-venda.dto';
import { Repository, EntityNotFoundError } from 'typeorm';
import { StatusVenda } from './entities/status-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class StatusVendaService {

    constructor(
        @InjectRepository(StatusVenda) private statusVendaRepository: Repository<StatusVenda>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscar(user: any): Promise<StatusVenda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusVendaRepository
                .createQueryBuilder("status_venda")
                .orderBy('status_venda.descricao', 'DESC')
                .getMany()
        } else {
            return null
        }
    }

    async buscarPorId(id: number, user: any): Promise<StatusVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusVendaRepository
                .createQueryBuilder("status_venda")
                .where("status_venda.id = :id", { id: id })
                .getOne()
        } else {
            return null
        }
    }

    async buscarPorDescricao(descricao: string, user: any): Promise<StatusVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.statusVendaRepository
                .createQueryBuilder("status_venda")
                .where("status_venda.descricao = :descricao", { descricao: descricao })
                .getOne()
        } else {
            return null
        }
    }

    async inserir(inserirStatusVendaDto: InserirStatusVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const statusVenda = this.statusVendaRepository.create(inserirStatusVendaDto)
            return this.statusVendaRepository.save(statusVenda)
        } else {
            return null
        }
    }

    async atualizar(id: number, atualizarStatusVendaDto: AtualizarStatusVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = this.statusVendaRepository.update({ id: id }, atualizarStatusVendaDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(StatusVenda, id)
            }

            return this.statusVendaRepository.findOneBy({ id })
        }
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.statusVendaRepository.delete({ id: id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(StatusVenda, id)
            }
        }
    }
}
