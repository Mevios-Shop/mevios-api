/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarPagamentoCompraDebitoDto } from './dto/atualizar-pagamento-compra-debito.dto';
import { InserirPagamentoCompraDebitoDto } from './dto/inserir-pagamento-compra-debito.dto';
import { PagamentoCompraDebito } from './entities/pagamento-compra-debito.entity';

@Injectable()
export class PagamentoCompraDebitoService { 

    constructor(@InjectRepository(PagamentoCompraDebito) private pagamentoCompraDebitoRepository: Repository<PagamentoCompraDebito>) {
        
    }

    buscar() {
        return this.pagamentoCompraDebitoRepository.find()
    }

    buscarPorId(id: number) {
        return this.pagamentoCompraDebitoRepository.findOne(id)
    }

    inserir(inserirPagamentoCompraDebitoDto: InserirPagamentoCompraDebitoDto) {
        const pagamento_compra_debito = this.pagamentoCompraDebitoRepository.create(inserirPagamentoCompraDebitoDto)
        
        return this.pagamentoCompraDebitoRepository.save(pagamento_compra_debito)
    }

    async atualizar(id: number, atualizarPagamentoCompraDebitoDto: AtualizarPagamentoCompraDebitoDto) {
        const resultadoAtualizacao = this.pagamentoCompraDebitoRepository.update(id, atualizarPagamentoCompraDebitoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(PagamentoCompraDebito, id)
        }

        return this.pagamentoCompraDebitoRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.pagamentoCompraDebitoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(PagamentoCompraDebito, id)
        }
    }
}
