/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarMetodoPagamentoDto } from './dto/atualizar-metodo-pagamento.dto';
import { InserirMetodoPagamentoDto } from './dto/inserir-metodo-pagamento.dto';
import { MetodoPagamento } from './entities/metodo-pagamento.entity';

@Injectable()
export class MetodoPagamentoService {

    constructor(@InjectRepository(MetodoPagamento) private metodoPagamentoRepository: Repository<MetodoPagamento>) {
        
    }

    inserir (inserirMetodoPagamentoDto: InserirMetodoPagamentoDto) {
        const metodo_pagamento = this.metodoPagamentoRepository.create(inserirMetodoPagamentoDto)
        return this.metodoPagamentoRepository.save(metodo_pagamento)
    }

    buscar(): Promise<MetodoPagamento[]> {
        return this.metodoPagamentoRepository.find()
    }

    buscarPorId(id: number): Promise<MetodoPagamento> {
        return this.metodoPagamentoRepository.findOne(id)
    }

    async atualizar(id: number, atualizarMetodoPagamentoDto: AtualizarMetodoPagamentoDto) {
        const resultadoAtualizacao = this.metodoPagamentoRepository.update(id, atualizarMetodoPagamentoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(MetodoPagamento, id)
        }
        
        return this.metodoPagamentoRepository.findOne(id)
    }

    async deletar(id: number): Promise<any> {
        const resultadoDelecao = await this.metodoPagamentoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(MetodoPagamento, id)
        }
    }
}
