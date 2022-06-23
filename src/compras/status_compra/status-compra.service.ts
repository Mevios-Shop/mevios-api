/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarStatusCompraDto } from './dto/atualizar-status-compra.dto';
import { InserirStatusCompraDto } from './dto/inserir-status-compra.dto';
import { StatusCompra } from './entities/status-compra.entity';

@Injectable()
export class StatusCompraService {

    constructor(@InjectRepository(StatusCompra) private statusCompraRepository: Repository<StatusCompra>) {

    }

    buscarStatusCompra(): Promise<StatusCompra[]> {
        return this.statusCompraRepository.find()
    }

    buscarStatusCompraPorId(id: number): Promise<StatusCompra> {
        return this.statusCompraRepository.findOne(id)
    }

    inserir(inserirStatusCompraDto: InserirStatusCompraDto) {
        
        const status_compra = this.statusCompraRepository.create(inserirStatusCompraDto)
        return this.statusCompraRepository.save(status_compra)
    }

    async atualizar(id: number, atualizarStatusCompraDto: AtualizarStatusCompraDto) {
        const resultadoAtualizacao = this.statusCompraRepository.update(id, atualizarStatusCompraDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(StatusCompra, id)
        }

        return this.statusCompraRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.statusCompraRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(StatusCompra, id)
        }
    }

}
