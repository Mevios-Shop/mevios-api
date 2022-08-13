/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarItemCompraDto } from './dto/atualizar-item-compra.dto';
import { InserirItemCompraDto } from './dto/inserir-item-compra.dto';
import { ItemCompra } from './entities/item-compra.entity';

@Injectable()
export class ItemCompraService {

    constructor(@InjectRepository(ItemCompra) private itemCompraRepository: Repository<ItemCompra>) {

    }

    buscarPorIdCompra(compraId: number): Promise<ItemCompra[]> {
        return this.itemCompraRepository.find({ where: { compra: compraId } })
    }

    buscarPorId(id: number): Promise<ItemCompra> {
        return this.itemCompraRepository.findOneBy({id})
    }

    inserir(inserirItemCompraDto: InserirItemCompraDto) {
        const item_compra = this.itemCompraRepository.create(inserirItemCompraDto)

        return this.itemCompraRepository.save(item_compra)
    }

    inserirVarios(inserirItensCompraDto: InserirItemCompraDto) {
        let itens_compra = []

        for (let index = 0; index < inserirItensCompraDto.quantidade; index++) {
            itens_compra.push(this.itemCompraRepository.create(inserirItensCompraDto))            
        }

        let ITENS_COMPRA = this.itemCompraRepository.create(inserirItensCompraDto)

        return this.itemCompraRepository.save(itens_compra)
    }

    async atualizar(id: number, atualizarItemCompraDto: AtualizarItemCompraDto) {
        const resultadoAtualizacao = this.itemCompraRepository.update(id, atualizarItemCompraDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(ItemCompra, id)
        }

        return this.itemCompraRepository.findOneBy({id})
    }

    async deletarPorIdCompra(compraId: number) {

        const resultadoDelecao = this.itemCompraRepository.delete({ compra: compraId })

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(ItemCompra, compraId)
        }
    }

    async deletar(id: number) {
        const resultadoDelecao = this.itemCompraRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(ItemCompra, id)
        }
    }
}
