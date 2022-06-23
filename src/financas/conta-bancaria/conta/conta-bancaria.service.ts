/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarContaBancariaDto } from './dto/atualizar-conta-bancaria.dto';
import { InserirContaBancariaDto } from './dto/inserir-conta-bancaria.dto';
import { ContaBancaria } from './entities/conta-bancaria.entity';

@Injectable()
export class ContaBancariaService { 

    constructor(@InjectRepository(ContaBancaria) private contaBancariaRepository: Repository<ContaBancaria>) {
        
    }

    inserir (inserirContaBancariaDto: InserirContaBancariaDto) {
        const contaBancaria = this.contaBancariaRepository.create(inserirContaBancariaDto)
        return this.contaBancariaRepository.save(contaBancaria)
    }

    buscar(): Promise<ContaBancaria[]> {
        return this.contaBancariaRepository.find()
    }

    buscarPorId(id: number): Promise<ContaBancaria> {
        return this.contaBancariaRepository.findOne(id)
    }

    async atualizar(id: number, atualizarContaBancariaDto: AtualizarContaBancariaDto) {
        const resultadoAtualizacao = this.contaBancariaRepository.update(id, atualizarContaBancariaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(ContaBancaria, id)
        }
        
        return this.contaBancariaRepository.findOne(id)
    }

    async deletar(id: number): Promise<any> {
        const resultadoDelecao = await this.contaBancariaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(ContaBancaria, id)
        }
    }
}
