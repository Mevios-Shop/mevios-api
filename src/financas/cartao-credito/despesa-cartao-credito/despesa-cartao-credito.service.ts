/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarDespesaCartaoCreditoDto } from './dto/atualizar-despesa-cartao-credito.dto';
import { InserirDespesaCartaoCreditoDto } from './dto/inserir-despesa-cartao-credito.dto';
import { DespesaCartaoCredito } from './entities/despesa-cartao-credito.entity';

@Injectable()
export class DespesaCartaoCreditoService {

    constructor(@InjectRepository(DespesaCartaoCredito) private despesaCartaoCreditoRepository: Repository<DespesaCartaoCredito>) {
        
    }

    inserir (inserirDespesaCartaoCreditoDto: InserirDespesaCartaoCreditoDto) {
        const despesa_cartao = this.despesaCartaoCreditoRepository.create(inserirDespesaCartaoCreditoDto)
        return this.despesaCartaoCreditoRepository.save(despesa_cartao)
    }

    buscarPorIdCartao(cartaoCreditoId: number): Promise<DespesaCartaoCredito[]> {
        return this.despesaCartaoCreditoRepository.find({ where: { cartao_credito: `${cartaoCreditoId}` }})
    }

    buscarPorId(id: number): Promise<DespesaCartaoCredito> {
        return this.despesaCartaoCreditoRepository.findOne(id)
    }

    async atualizar(id: number, atualizarDespesaCartaoCreditoDto: AtualizarDespesaCartaoCreditoDto) {
        const resultadoAtualizacao = this.despesaCartaoCreditoRepository.update(id, atualizarDespesaCartaoCreditoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(DespesaCartaoCredito, id)
        }
        
        return this.despesaCartaoCreditoRepository.findOne(id)
    }

    async deletar(id: number): Promise<any> {
        const resultadoDelecao = await this.despesaCartaoCreditoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(DespesaCartaoCredito, id)
        }
    }
}
