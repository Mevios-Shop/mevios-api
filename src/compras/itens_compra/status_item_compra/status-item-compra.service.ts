/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarStatusItemCompraDto } from './dto/atualizar-status-item-compra.dto';
import { InserirStatusItemCompraDto } from './dto/inserir-status-item-compra.dto';
import { StatusItemCompra } from './entities/status-item-compra.entity';

@Injectable()
export class StatusItemCompraService {

    constructor(@InjectRepository(StatusItemCompra) private statusItemCompraRepository: Repository<StatusItemCompra>) {

    }

    buscarStatusItemCompra(): Promise<StatusItemCompra[]> {
        return this.statusItemCompraRepository.find()
    }

    buscarStatusItemCompraPorId(id: number): Promise<StatusItemCompra> {
        return this.statusItemCompraRepository.findOneBy({id})
    }

    inserir(inserirStatusItemCompraDto: InserirStatusItemCompraDto) {
        
        const STATUS_ITEM_COMPRA = this.statusItemCompraRepository.create(inserirStatusItemCompraDto)
        return this.statusItemCompraRepository.save(STATUS_ITEM_COMPRA)
    }

    async atualizar(id: number, atualizarStatusItemCompraDto: AtualizarStatusItemCompraDto) {
        const RESULTADO_ATUALIZACAO = this.statusItemCompraRepository.update(id, atualizarStatusItemCompraDto)

        if (!(await RESULTADO_ATUALIZACAO).affected) {
            throw new EntityNotFoundError(StatusItemCompra, id)
        }

        return this.statusItemCompraRepository.findOneBy({id})
    }

    async deletar(id: number) {
        const RESULTADO_DELECAO = await this.statusItemCompraRepository.delete(id)

        if (!(await RESULTADO_DELECAO).affected) {
            throw new EntityNotFoundError(StatusItemCompra, id)
        }
    }

}
