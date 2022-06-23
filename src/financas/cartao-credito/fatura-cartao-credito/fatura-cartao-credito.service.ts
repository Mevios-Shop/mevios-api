/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimentacaoBancaria } from 'src/financas/conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarFaturaCartaoCreditoDto } from './dto/atualizar-fatura-cartao-credito.dto';
import { InserirFaturaCartaoCreditoDto } from './dto/inserir-fatura-cartao-credito.dto';
import { FaturaCartaoCredito } from './entities/fatura-cartao-credito.entity';

@Injectable()
export class FaturaCartaoCreditoService {

    constructor(@InjectRepository(FaturaCartaoCredito) private faturaCartaoCreditoRepository: Repository<FaturaCartaoCredito>) {
        
    }

    buscar(): Promise<FaturaCartaoCredito[]> {
        return this.faturaCartaoCreditoRepository.find()
    }

    buscarPorId(id: number): Promise<FaturaCartaoCredito> {
        return this.faturaCartaoCreditoRepository.findOne(id)
    }

    inserir(inserirFaturaCartaoCreditoDto: InserirFaturaCartaoCreditoDto) {
        const fatura = this.faturaCartaoCreditoRepository.create(inserirFaturaCartaoCreditoDto)
        
        return this.faturaCartaoCreditoRepository.save(fatura)
    }

    async atualizar(id: number, atualizarFaturaCartaoCreditoDto: AtualizarFaturaCartaoCreditoDto) {
        const resultadoAtualizacao = this.faturaCartaoCreditoRepository.update(id, atualizarFaturaCartaoCreditoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(MovimentacaoBancaria, id)
        }

        return this.faturaCartaoCreditoRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.faturaCartaoCreditoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(MovimentacaoBancaria, id)
        }
    }
}
