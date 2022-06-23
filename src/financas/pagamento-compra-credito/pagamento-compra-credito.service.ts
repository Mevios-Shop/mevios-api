import { AtualizarPagamentoCompraCreditoDto } from './dto/atualizar-pagamento-compra-credito.dto';
import { InserirPagamentoCompraCreditoDto } from './dto/inserir-pagamento-compra-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { PagamentocompraCredito } from './entities/pagamento-compra-credito.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoCompraCreditoService {

    constructor(@InjectRepository(PagamentocompraCredito) private pagamentoCompraCreditoRepository: Repository<PagamentocompraCredito>) {
        
    }

    buscar() {
        return this.pagamentoCompraCreditoRepository.find()
    }

    buscarPorId(id: number) {
        return this.pagamentoCompraCreditoRepository.findOne(id)
    }

    inserir(inserirPagamentoCompraCreditoDto: InserirPagamentoCompraCreditoDto) {
        const pagamento_compra_Credito = this.pagamentoCompraCreditoRepository.create(inserirPagamentoCompraCreditoDto)
        
        return this.pagamentoCompraCreditoRepository.save(pagamento_compra_Credito)
    }

    async atualizar(id: number, atualizarPagamentoCompraCreditoDto: AtualizarPagamentoCompraCreditoDto) {
        const resultadoAtualizacao = this.pagamentoCompraCreditoRepository.update(id, atualizarPagamentoCompraCreditoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(PagamentocompraCredito, id)
        }

        return this.pagamentoCompraCreditoRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.pagamentoCompraCreditoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(PagamentocompraCredito, id)
        }
    }
}
