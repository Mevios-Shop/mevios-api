/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarPlataformaDto } from './dto/atualizar-plataforma.dto';
import { InserirPlataformaDto } from './dto/inserir-plataforma.dto';
import { Plataforma } from './entities/plataforma.entity';

@Injectable()
export class PlataformasService {

    constructor(@InjectRepository(Plataforma) private plataformaRepository: Repository<Plataforma>) {
        
    }

    inserir(inserirPlataformaDto: InserirPlataformaDto) {
        const plataforma = this.plataformaRepository.create(inserirPlataformaDto)
        return this.plataformaRepository.save(plataforma)
    }

    buscarTodos(): Promise<Plataforma[]> {
        return this.plataformaRepository.find()
    }

    buscarPorId(id: number): Promise<Plataforma> {
        return this.plataformaRepository.findOneBy({id})
    }

    buscarPorDescricao(descricao: string): Promise<Plataforma> {
        return this.plataformaRepository.findOne({ where: { descricao: `${descricao}` }})
    }

    async atualizar(id: number, atualizarPlataformaDto: AtualizarPlataformaDto) {
        const resultadoAtualizacao = this.plataformaRepository.update(id, atualizarPlataformaDto)
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Plataforma, id)
        }
        return this.plataformaRepository.findOneBy({id})
    }

    async deletar(id: number): Promise<any>{

        const resultadoDelecao = await this.plataformaRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Plataforma, id)
        }
    }
}