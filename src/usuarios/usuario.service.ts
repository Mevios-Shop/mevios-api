import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { InserirUsuarioDto } from './dto/inserir-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuarioService { 

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>
        ) {}

    buscarPorId(id: number): Promise<Usuario> {

        return this.usuarioRepository.findOneBy({id})
    }

    async buscarPorEmail(email: string): Promise<Usuario> {
        console.log('UsuarioService:buscarPorEmail....')
        const usuario = await this.usuarioRepository.findOneBy({email})
        return await this.usuarioRepository.findOneBy({email})
    }

    async inserir(inserirUsuarioDto: InserirUsuarioDto) {

        inserirUsuarioDto.senha = await bcrypt.hash(inserirUsuarioDto.senha, 10);

        const usuario = await this.usuarioRepository.create(inserirUsuarioDto)

        return this.usuarioRepository.save(usuario)
    }

    async atualizar(id: number, atualizarUsuarioDto: AtualizarUsuarioDto) {

        const resultadoAtualizacao = this.usuarioRepository.update(id, atualizarUsuarioDto)
        
        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Usuario, id)
        }
        return this.usuarioRepository.findOneBy({id})
    }

    async deletar(id: number): Promise<any>{

        const resultadoDelecao = await this.usuarioRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Usuario, id)
        }
    }
}