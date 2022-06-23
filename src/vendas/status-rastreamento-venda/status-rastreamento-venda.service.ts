import { AtualizarStatusRastreamentovendaDto } from './dto/atualizar-status-rastreamento-venda.dto';
import { InserirStatusRastreamentoVendaDto } from './dto/inserir-status-rastreamento-venda.dto';
import { StatusRastreamentoVenda } from './entities/status-rastreamento-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';

@Injectable()
export class StatusRastreamentoVendaService {

    constructor(@InjectRepository(StatusRastreamentoVenda) private statusRastreamentoVendaRepository: Repository<StatusRastreamentoVenda>) {
        
    }

    buscarStatusRastreamentoVenda(): Promise<StatusRastreamentoVenda[]> {
        return this.statusRastreamentoVendaRepository.find()
    }

    buscarStatusRastreamentoVendaPorId(id: number): Promise<StatusRastreamentoVenda> {
        return this.statusRastreamentoVendaRepository.findOne(id)
    }

    inserir(inserirStatusVendaDto: InserirStatusRastreamentoVendaDto) {
        
        const status_rastreamento_venda = this.statusRastreamentoVendaRepository.create(inserirStatusVendaDto)
        return this.statusRastreamentoVendaRepository.save(status_rastreamento_venda)
    }

    async atualizar(id: number, atualizarStatusVendaDto: AtualizarStatusRastreamentovendaDto) {
        const resultadoAtualizacao = this.statusRastreamentoVendaRepository.update(id, atualizarStatusVendaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(StatusRastreamentoVenda, id)
        }

        return this.statusRastreamentoVendaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.statusRastreamentoVendaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(StatusRastreamentoVenda, id)
        }
    }
 }
