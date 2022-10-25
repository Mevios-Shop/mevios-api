import { AtualizarRastreamentoVendaDto } from './dto/atualizar-rastreamento-venda.dto';
import { InserirRastreamentoVendaDto } from './dto/inserir-rastreamento-venda.dto';
import { RastreamentoVenda } from './entities/rastreamento-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class RastreamentoVendaService {

    constructor(
        @InjectRepository(RastreamentoVenda) private rastreamentoVendaRepository: Repository<RastreamentoVenda>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
        ) {
        
    }

    async buscarPorId(id: number, user: any): Promise<RastreamentoVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.rastreamentoVendaRepository
                .createQueryBuilder("rastreamento_venda")
                .leftJoinAndSelect("rastreamento_venda.venda", "venda")
                .leftJoinAndSelect("venda.plataforma", "plataforma")
                .where("rastreamento_venda.id = :id", { id })
                .andWhere("venda.usuario = :usuario", { usuario: usuario.id })
                .getOne()
        } else {
            return null
        }
        
    }

    async buscarPorVendaId(vendaId: number, user: any): Promise<RastreamentoVenda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.rastreamentoVendaRepository
                .createQueryBuilder("rastreamento_venda")
                .leftJoinAndSelect("rastreamento_venda.venda", "venda")
                .leftJoinAndSelect("venda.plataforma", "plataforma")
                .where("rastreramento_venda.venda = :vendaId", { vendaId })
                .andWhere("venda.usuario = :usuario", { usuario: usuario.id })
                .getMany()
        } else {
            return null
        }
    }

    async inserir(inserirRastreamentoVendaDto: InserirRastreamentoVendaDto, user: any): Promise<RastreamentoVenda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirRastreamentoVendaDto.usuario = usuario.id
            const rastreamento_venda = this.rastreamentoVendaRepository.create(inserirRastreamentoVendaDto)

            return await this.rastreamentoVendaRepository.save(rastreamento_venda)
        } else {
            return null
        }
    }

    async atualizar(id: number, atualizarRastreamentoVendaDto: AtualizarRastreamentoVendaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            
            const resultadoAtualizacao = this.rastreamentoVendaRepository.update(
                { id: id, usuario: usuario.id }, 
                atualizarRastreamentoVendaDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(RastreamentoVenda, id)
            }
            return await this.rastreamentoVendaRepository.findOneBy({id})
        } else {
            return null
        }
    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = this.rastreamentoVendaRepository.delete({ id: id, usuario: usuario.id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(RastreamentoVenda, id)
            }
        }
    }
 }
