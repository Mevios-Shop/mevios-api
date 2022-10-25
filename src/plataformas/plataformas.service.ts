/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarPlataformaDto } from './dto/atualizar-plataforma.dto';
import { InserirPlataformaDto } from './dto/inserir-plataforma.dto';
import { Plataforma } from './entities/plataforma.entity';

@Injectable()
export class PlataformasService {

    constructor(
        @InjectRepository(Plataforma) private plataformaRepository: Repository<Plataforma>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async inserir(inserirPlataformaDto: InserirPlataformaDto, user: any): Promise<Plataforma> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const plataforma = this.plataformaRepository.create(inserirPlataformaDto)
            return await this.plataformaRepository.save(plataforma)
        }
    }

    async buscarTodos(user: any): Promise<Plataforma[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.plataformaRepository
                .createQueryBuilder("plataforma")
                .orderBy('plataforma.descricao', 'ASC')
                .getMany()
        }
        return []
    }

    async buscarPorId(id: number, user: any): Promise<Plataforma> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.plataformaRepository
                .createQueryBuilder("plataforma")
                .where("plataforma.id = :id", { id: id })
                .getOne()
        }
        return null
    }

    async buscarPorDescricao(descricao: string, user: any): Promise<Plataforma> {
        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.plataformaRepository
                .createQueryBuilder("plataforma")
                .where("plataforma.descricao = :descricao", { descricao: descricao })
                .orderBy('plataforma.descricao', 'ASC')
                .getOne()
        }
        return null
    }

    async atualizar(id: number, atualizarPlataformaDto: AtualizarPlataformaDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.plataformaRepository.update({ id: id }, atualizarPlataformaDto)
            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(Plataforma, id)
            }
            return await this.plataformaRepository.findOneBy({ id })
        }
        return null
    }

    async deletar(id: number, user: any): Promise<any> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.plataformaRepository.delete({ id: id })
            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(Plataforma, id)
            }
        }
        return null
    }
}