import { AtualizarTipoReceitaBancariaDto } from './dto/atualizar-tipo-receita-bancaria.dto';
import { InserirTipoReceitaBancariaDto } from './dto/inserir-tipo-receita-bancaria.dto';
import { TipoReceitaBancaria } from './entities/tipo-receita-bancaria.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoReceitaBancariaService {

    constructor(@InjectRepository(TipoReceitaBancaria) private tipoReceitaBancariaRepository: Repository<TipoReceitaBancaria>) {

    }

    buscarStatusCompra(): Promise<TipoReceitaBancaria[]> {
        return this.tipoReceitaBancariaRepository.find()
    }

    buscarPorId(id: number): Promise<TipoReceitaBancaria> {
        return this.tipoReceitaBancariaRepository.findOne(id)
    }

    inserir(inserirtipoReceitaBancariaDto: InserirTipoReceitaBancariaDto) {
        
        const tipo_receita = this.tipoReceitaBancariaRepository.create(inserirtipoReceitaBancariaDto)
        return this.tipoReceitaBancariaRepository.save(tipo_receita)
    }

    async atualizar(id: number, atualizartipoReceitaBancariaDto: AtualizarTipoReceitaBancariaDto) {
        const resultadoAtualizacao = this.tipoReceitaBancariaRepository.update(id, atualizartipoReceitaBancariaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(TipoReceitaBancaria, id)
        }

        return this.tipoReceitaBancariaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.tipoReceitaBancariaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(TipoReceitaBancaria, id)
        }
    }
}
