import { InserirPagamentoVendasDto } from './dto/inserir-pagamento-vendas.dto';
import { AtualizarPagamentoVendasDto } from './dto/atualizar-pagamento-vendas.dto';
import { PagamentoVendas } from './entities/pagamento_vendas.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PagamentoVendasService {

    constructor(@InjectRepository(PagamentoVendas) private pagamentoVendasRepository: Repository<PagamentoVendas>) {
        
    }

    buscar() {
        return this.pagamentoVendasRepository.find()
    }

    buscarPorId(id: number) {
        return this.pagamentoVendasRepository.findOne(id)
    }

    inserir(inserirPagamentoVendasDto: InserirPagamentoVendasDto) {
        const pagamento_vendas = this.pagamentoVendasRepository.create(inserirPagamentoVendasDto)
        
        return this.pagamentoVendasRepository.save(pagamento_vendas)
    }

    async atualizar(id: number, atualizarPagamentoVendasDto: AtualizarPagamentoVendasDto) {
        const resultadoAtualizacao = this.pagamentoVendasRepository.update(id, atualizarPagamentoVendasDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(PagamentoVendas, id)
        }

        return this.pagamentoVendasRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.pagamentoVendasRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(PagamentoVendas, id)
        }
    }
}
