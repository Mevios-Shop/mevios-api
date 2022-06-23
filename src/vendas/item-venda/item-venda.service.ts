import { AtualizarItemVendaDto } from './dto/atualizar-item-venda.dto';
import { InserirItemVendaDto } from './dto/inserir-item-venda.dto';
import { ItemVenda } from './entities/item-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ItemVendaService {

    constructor(@InjectRepository(ItemVenda) private itemCompraRepository: Repository<ItemVenda>) {
        
    }

    buscarPorIdVenda(vendaId: number): Promise<ItemVenda[]> {
        return this.itemCompraRepository.find({ where: { venda: `${vendaId}` }})
    }

    buscarPorId(id: number): Promise<ItemVenda> {
        return this.itemCompraRepository.findOne(id)
    }

    inserir(inserirItemCompraDto: InserirItemVendaDto) {
        const item_compra = this.itemCompraRepository.create(inserirItemCompraDto)
        
        return this.itemCompraRepository.save(item_compra)
    }

    async atualizar(id: number, atualizarItemCompraDto: AtualizarItemVendaDto) {
        const resultadoAtualizacao = this.itemCompraRepository.update(id, atualizarItemCompraDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(ItemVenda, id)
        }

        return this.itemCompraRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.itemCompraRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(ItemVenda, id)
        }
    }
}
