/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarCartaoCreditoDto } from './dto/atualizar-cartao-credito.dto';
import { InserirCartaoCreditoDto } from './dto/inserir-cartao-credito.dto';
import { CartaoCredito } from './entities/cartao-credito.entity';

@Injectable()
export class CartaoCreditoService {

    constructor(@InjectRepository(CartaoCredito) private cartaoCreditoRepository: Repository<CartaoCredito>) {
        
    }

    buscar(): Promise<CartaoCredito[]> {
        return this.cartaoCreditoRepository.find()
    }

    buscarPorId(id: number): Promise<CartaoCredito> {
        return this.cartaoCreditoRepository.findOne(id)
    }

    inserir(inserirCartaoCreditoDto: InserirCartaoCreditoDto) {
        const item_compra = this.cartaoCreditoRepository.create(inserirCartaoCreditoDto)
        
        return this.cartaoCreditoRepository.save(item_compra)
    }

    async atualizar(id: number, atualizarCartaoCreditoDto: AtualizarCartaoCreditoDto) {
        const resultadoAtualizacao = this.cartaoCreditoRepository.update(id, atualizarCartaoCreditoDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(CartaoCredito, id)
        }

        return this.cartaoCreditoRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = this.cartaoCreditoRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(CartaoCredito, id)
        }
    }
}
