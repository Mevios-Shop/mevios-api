import { AtualizarRastreamentoVendaDto } from './dto/atualizar-rastreamento-venda.dto';
import { InserirRastreamentoVendaDto } from './dto/inserir-rastreamento-venda.dto';
import { RastreamentoVenda } from './entities/rastreamento-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';

@Injectable()
export class RastreamentoVendaService {

    constructor(@InjectRepository(RastreamentoVenda) private rastreamentoVendaRepository: Repository<RastreamentoVenda>) {
        
    }

    buscarPorId(id: number): Promise<RastreamentoVenda> {
        return this.rastreamentoVendaRepository.findOne(id)
    }

    buscarPorVendaId(vendaId: number): Promise<RastreamentoVenda[]> {
        return this.rastreamentoVendaRepository.find({ where: { venda: vendaId }})
    }

    inserir(inserirRastreamentoVendaDto: InserirRastreamentoVendaDto) {
        const rastreamento_venda = this.rastreamentoVendaRepository.create(inserirRastreamentoVendaDto)

        return this.rastreamentoVendaRepository.save(rastreamento_venda)
    }

    async atualizar(id: number, atualizarRastreamentoVendaDto: AtualizarRastreamentoVendaDto) {
        const resultadoAtualizacao = this.rastreamentoVendaRepository.update(id, atualizarRastreamentoVendaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(RastreamentoVenda, id)
        }

        return this.rastreamentoVendaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.rastreamentoVendaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(RastreamentoVenda, id)
        }
    }
 }
