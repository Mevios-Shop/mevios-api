/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarCompraDto } from './dto/atualizar-compra.dto';
import { InserirCompraDto } from './dto/inserir-compra.dto';
import { Compra } from './entities/compra.entity';

@Injectable()
export class ComprasService { 

    constructor(@InjectRepository(Compra) private compraRepository: Repository<Compra>) {
        
    }

    buscarCompras(): Promise<Compra[]> {
        return this.compraRepository.find({
            order: {
                data: "DESC"
            }
        })
    }

    buscarCompraPorId(id: number): Promise<Compra> {
        return this.compraRepository.findOne(id)
    }

    buscarComprasPorStatusCompraId(id: number) {
        return this.compraRepository.find({ 
            where: { status_compra: `${id}`}, 
            order: {
            data: "DESC"
        } })
    }

    inserir(inserirCompraDto: InserirCompraDto) {
        
        const compra = this.compraRepository.create(inserirCompraDto)
        return this.compraRepository.save(compra)
    }

    async atualizar(id: number, atualizarCompraDto: AtualizarCompraDto) {
        const resultadoAtualizacao = this.compraRepository.update(id, atualizarCompraDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Compra, id)
        }

        return this.compraRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.compraRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Compra, id)
        }
    }
}
