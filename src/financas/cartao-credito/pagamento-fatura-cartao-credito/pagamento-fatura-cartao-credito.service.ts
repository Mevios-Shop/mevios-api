/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarPagamentoFaturaCartaoCreditoDto } from './dto/atualizar-pagamento-fatura-cartao-credito.dto';
import { InserirPagamentoFaturaCartaoCreditoDto } from './dto/inserir-pagamento-fatura-cartao-credito.dto';
import { PagamentoFaturaCartaoCredito } from './entities/pagamento-fatura-cartao-credito.entity';

@Injectable()
export class PagamentoFaturaCartaoCreditoService { 

    constructor(@InjectRepository(PagamentoFaturaCartaoCredito) private pagamentoFaturaCartaoCreditoRepository: Repository<PagamentoFaturaCartaoCredito>) {
        
    }

    buscarPorId(id: number): Promise<PagamentoFaturaCartaoCredito> {
        return this.pagamentoFaturaCartaoCreditoRepository.findOne(id)
    }

    inserir(inserirPagamentoFaturaCartaoCreditoDto: InserirPagamentoFaturaCartaoCreditoDto) {
        const pagamento_fatura = this.pagamentoFaturaCartaoCreditoRepository.create(inserirPagamentoFaturaCartaoCreditoDto)
        
        return this.pagamentoFaturaCartaoCreditoRepository.save(pagamento_fatura)
    }

    async atualizar(id: number, atualizarPagamentoFaturaCartaoCreditoDto: AtualizarPagamentoFaturaCartaoCreditoDto) {
        const resultadoAtualizacao = this.pagamentoFaturaCartaoCreditoRepository.update(id, atualizarPagamentoFaturaCartaoCreditoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(PagamentoFaturaCartaoCreditoService, id)
        }

        return this.pagamentoFaturaCartaoCreditoRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.pagamentoFaturaCartaoCreditoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(PagamentoFaturaCartaoCreditoService, id)
        }
    }
}
