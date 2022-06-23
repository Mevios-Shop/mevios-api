import { AtualizarTipoDespesaDto } from './dto/atualizar-tipo-despesa.dto';
import { InserirTipoDespesaDto } from './dto/inserir-tipo-despesa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { TipoDespesa } from './entities/tipo-despesa.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class TipoDespesaService {

    constructor(@InjectRepository(TipoDespesa) private statusCompraRepository: Repository<TipoDespesa>) {

    }

    buscarStatusCompra(): Promise<TipoDespesa[]> {
        return this.statusCompraRepository.find()
    }

    buscarStatusCompraPorId(id: number): Promise<TipoDespesa> {
        return this.statusCompraRepository.findOne(id)
    }

    inserir(inserirTipoDespesaDto: InserirTipoDespesaDto) {
        
        const tipo_despesa = this.statusCompraRepository.create(inserirTipoDespesaDto)
        return this.statusCompraRepository.save(tipo_despesa)
    }

    async atualizar(id: number, atualizarTipoDespesaDto: AtualizarTipoDespesaDto) {
        const resultadoAtualizacao = this.statusCompraRepository.update(id, atualizarTipoDespesaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(TipoDespesa, id)
        }

        return this.statusCompraRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.statusCompraRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(TipoDespesa, id)
        }
    }
}
