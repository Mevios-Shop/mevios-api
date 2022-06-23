/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarTipoMovimentacaoBancariaDto } from './dto/atualizar-tipo-movimentacao-bancaria.dto';
import { InserirTipoMovimentacaoBancariaDto } from './dto/inserir-tipo-movimentacao-bancaria.dto';
import { TipoMovimentacaoBancaria } from './entities/tipo-movimentacao-bancaria.entity';

@Injectable()
export class TipoMovimentacaoBancariaService {

    constructor(@InjectRepository(TipoMovimentacaoBancaria) private tipoMovimentacaoBancariaRepository: Repository<TipoMovimentacaoBancaria>) {
        
    }

    inserir (inserirTipoMovimentacaoBancariaDto: InserirTipoMovimentacaoBancariaDto) {
        const tipoMovimentacaoBancaria = this.tipoMovimentacaoBancariaRepository.create(inserirTipoMovimentacaoBancariaDto)
        return this.tipoMovimentacaoBancariaRepository.save(tipoMovimentacaoBancaria)
    }

    buscar(): Promise<TipoMovimentacaoBancaria[]> {
        return this.tipoMovimentacaoBancariaRepository.find()
    }

    buscarPorId(id: number): Promise<TipoMovimentacaoBancaria> {
        return this.tipoMovimentacaoBancariaRepository.findOne(id)
    }

    async atualizar(id: number, atualizarTipoMovimentacaoBancariaDto: AtualizarTipoMovimentacaoBancariaDto) {
        const resultadoAtualizacao = this.tipoMovimentacaoBancariaRepository.update(id, atualizarTipoMovimentacaoBancariaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(TipoMovimentacaoBancaria, id)
        }
        
        return this.tipoMovimentacaoBancariaRepository.findOne(id)
    }

    async deletar(id: number): Promise<any> {
        const resultadoDelecao = await this.tipoMovimentacaoBancariaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(TipoMovimentacaoBancaria, id)
        }
    }
}
