import { InserirReceitaBancariaDto } from './dto/inserir-receita-bancaria.dto';
import { AtualizarReceitaBancariaDto } from './dto/atualizar-receita-bancaria.dto';
import { ReceitaBancaria } from './entities/receita-bancaria.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReceitaBancariaService { 

    constructor(@InjectRepository(ReceitaBancaria) private receitaBancariaRepository: Repository<ReceitaBancaria>) {
        
    }

    buscarPorIdContaBancaria(contaBancariaId: number): Promise<ReceitaBancaria[]> {
        return this.receitaBancariaRepository.find({ where: { conta_bancaria: `${contaBancariaId}` }})
    }

    buscarPorId(id: number) {
        return this.receitaBancariaRepository.findOne(id)
    }

    inserir(inserirReceitaBancariaDto: InserirReceitaBancariaDto) {
        const receita = this.receitaBancariaRepository.create(inserirReceitaBancariaDto)
        
        return this.receitaBancariaRepository.save(receita)
    }

    async atualizar(id: number, atualizarReceitaBancariaDto: AtualizarReceitaBancariaDto) {
        const resultadoAtualizacao = this.receitaBancariaRepository.update(id, atualizarReceitaBancariaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(ReceitaBancaria, id)
        }

        return this.receitaBancariaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.receitaBancariaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(ReceitaBancaria, id)
        }
    }
}
