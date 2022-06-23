import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { InserirUsuarioDto } from './dto/inserir-usuario.dto';
import { Usuario } from './entities/usuario.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService { 

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {}

    buscarPorId(id: number): Promise<Usuario> {

        return this.usuarioRepository.findOne(id) 
    }

    buscarPorEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({email})
    }

    async inserir(inserirUsuarioDto: InserirUsuarioDto) {
        const usuario = this.usuarioRepository.create(inserirUsuarioDto)

        return this.usuarioRepository.save(usuario)
    }

    async atualizar(id: number, atualizarUsuarioDto: AtualizarUsuarioDto) {

        const resultadoAtualizacao = this.usuarioRepository.update(id, atualizarUsuarioDto)
        
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Usuario, id)
        }
        return this.usuarioRepository.findOne(id)
    }

    async deletar(id: number): Promise<any>{

        const resultadoDelecao = await this.usuarioRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Usuario, id)
        }
    }
}