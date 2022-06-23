/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarMovimentacaoBancariaDto } from './dto/atualizar-movimentacao-bancaria.dto';
import { InserirMovimentacaoBancariaDto } from './dto/inserir-movimentacao-bancaria.dto';
import { MovimentacaoBancaria } from './entities/movimentacao-bancaria.entity';

@Injectable()
export class MovimentacaoBancariaService { 

    constructor(@InjectRepository(MovimentacaoBancaria) private movimentacaoBancariaRepository: Repository<MovimentacaoBancaria>) {
        
    }

    buscarPorIdContaBancaria(contaBancariaId: number) {
        return this.movimentacaoBancariaRepository.find({ where: { conta_bancaria: `${contaBancariaId}` }})
    }

    buscarPorId(id: number) {
        return this.movimentacaoBancariaRepository.findOne(id)
    }

    inserir(InserirMovimentacaoBancariaDto: InserirMovimentacaoBancariaDto) {
        const item_compra = this.movimentacaoBancariaRepository.create(InserirMovimentacaoBancariaDto)
        
        return this.movimentacaoBancariaRepository.save(item_compra)
    }

    async atualizar(id: number, atualizarMovimentacaoBancariaDto: AtualizarMovimentacaoBancariaDto) {
        const resultadoAtualizacao = this.movimentacaoBancariaRepository.update(id, atualizarMovimentacaoBancariaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(MovimentacaoBancaria, id)
        }

        return this.movimentacaoBancariaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.movimentacaoBancariaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(MovimentacaoBancaria, id)
        }
    }
}
