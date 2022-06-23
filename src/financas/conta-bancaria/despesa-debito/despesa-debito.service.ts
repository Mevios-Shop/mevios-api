import { AtualizarDespesaDebitoDto } from './dto/atualizar-despesa-debito.dto';
import { InserirDespesaDebitoDto } from './dto/inserir-despesa-debito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { DespesaDebito } from './entities/despesa-debito.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class DespesaDebitoService {

    constructor(@InjectRepository(DespesaDebito) private despesaDebitoRepository: Repository<DespesaDebito>) {
        
    }

    inserir (inserirDespesaDebitoDto: InserirDespesaDebitoDto) {
        const despesa_debito = this.despesaDebitoRepository.create(inserirDespesaDebitoDto)
        return this.despesaDebitoRepository.save(despesa_debito)
    }

    buscarPorIdContaBancaria(contaBancariaId: number): Promise<DespesaDebito[]> {
        return this.despesaDebitoRepository.find({ where: { conta_bancaria: `${contaBancariaId}` }})
    }

    buscarPorId(id: number): Promise<DespesaDebito> {
        return this.despesaDebitoRepository.findOne(id)
    }

    async atualizar(id: number, atualizarDespesaDebitoDto: AtualizarDespesaDebitoDto) {
        const resultadoAtualizacao = this.despesaDebitoRepository.update(id, atualizarDespesaDebitoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(DespesaDebito, id)
        }
        
        return this.despesaDebitoRepository.findOne(id)
    }

    async deletar(id: number): Promise<any> {
        const resultadoDelecao = await this.despesaDebitoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(DespesaDebito, id)
        }
    }
}
