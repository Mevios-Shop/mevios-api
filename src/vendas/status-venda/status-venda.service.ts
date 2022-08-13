import { InjectRepository } from '@nestjs/typeorm';
import { AtualizarStatusVendaDto } from './dto/atualizar-status-venda.dto';
import { InserirStatusVendaDto } from './dto/inserir-status-venda.dto';
import { Repository, EntityNotFoundError } from 'typeorm';
import { StatusVenda } from './entities/status-venda.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusVendaService { 

    constructor(@InjectRepository(StatusVenda) private statusVendaRepository: Repository<StatusVenda>) {

    }

    buscarStatusVenda(): Promise<StatusVenda[]> {
        return this.statusVendaRepository.find()
    }

    buscarStatusVendaPorId(id: number): Promise<StatusVenda> {
        return this.statusVendaRepository.findOneBy({id})
    }

    inserir(inserirStatusVendaDto: InserirStatusVendaDto) {
        
        const status_venda = this.statusVendaRepository.create(inserirStatusVendaDto)
        return this.statusVendaRepository.save(status_venda)
    }

    async atualizar(id: number, atualizarStatusVendaDto: AtualizarStatusVendaDto) {
        const resultadoAtualizacao = this.statusVendaRepository.update(id, atualizarStatusVendaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(StatusVenda, id)
        }

        return this.statusVendaRepository.findOneBy({id})
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.statusVendaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(StatusVenda, id)
        }
    }
}
