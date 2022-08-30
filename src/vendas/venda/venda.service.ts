import { ItensVendaDto } from './../item-venda/dto/itens-venda.dto';
import { InserirRastreamentoVendaDto } from './../rastreamento-venda/dto/inserir-rastreamento-venda.dto';
import { InserirItemVendaDto } from './../item-venda/dto/inserir-item-venda.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { InserirVendaDto } from './dto/inserir-venda.dto';
import { Venda } from './entities/venda.entity';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class VendaService {

    constructor(
        @InjectRepository(Venda) private vendaRepository: Repository<Venda>, private connection: Connection,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarVendas(user: any): Promise<Venda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.vendaRepository
                .createQueryBuilder('venda')
                .leftJoinAndSelect('venda.plataforma', 'plataforma')
                .leftJoinAndSelect('venda.status_venda', 'status_venda')
                .where('venda.usuarioId = :id', { id: usuario.id })
                .orderBy('data', 'DESC')
                .getMany()
        }
        return null
    }

    async buscarVendaPorId(id: number, user: any): Promise<Venda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.vendaRepository
                .createQueryBuilder('venda')
                .leftJoinAndSelect('venda.plataforma', 'plataforma')
                .leftJoinAndSelect('venda.status_venda', 'status_venda')
                .where('venda.usuarioId = :id', { id: usuario.id })
                .andWhere('venda.id = :id', { id: id })
                .getOne()
        }
        return null
    }

    async buscarVendasPorIdPlataforma(id_plataforma: number, user: any): Promise<Venda[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.vendaRepository
                .createQueryBuilder('venda')
                .leftJoinAndSelect('venda.plataforma', 'plataforma')
                .leftJoinAndSelect('venda.status_venda', 'status_venda')
                .where('venda.usuarioId = :id', { id: usuario.id })
                .andWhere('venda.plataformaId = :id', { id: id_plataforma })
                .orderBy('data', 'DESC')
                .getMany()
        }
        return null
    }

    async buscarVendaPorPedido(codigo_pedido: number, user: any): Promise<Venda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return this.vendaRepository
                .createQueryBuilder('venda')
                .leftJoinAndSelect('venda.plataforma', 'plataforma')
                .leftJoinAndSelect('venda.status_venda', 'status_venda')
                .where('venda.usuarioId = :id', { id: usuario.id })
                .andWhere('venda.codigo_pedido = :codigo_pedido', { codigo_pedido: codigo_pedido })
                .orderBy('data', 'DESC')
                .getOne()
        }
        return null
    }

    async inserir(inserirVendaDto: InserirVendaDto, user: any): Promise<Venda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirVendaDto.usuario = usuario.id
            const venda = this.vendaRepository.create(inserirVendaDto)
            return await this.vendaRepository.save(venda)
        }
        return null
    }

    /*
    async inserir2(inserirVendaDto: InserirVendaDto, itensVendaDto: ItensVendaDto, inserirRastreamentoVendaDto: InserirRastreamentoVendaDto, venda_completa: JSON) {
        
        const queryRunner = this.connection.createQueryRunner()

        await queryRunner.connect()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const venda = this.vendaRepository.create(inserirVendaDto)

            await queryRunner.manager.save(inserirVendaDto)

            const vendaId = await queryRunner.query('SELECT id FROM bd_api_vendas.venda WHERE codigo_pedido = ' + inserirVendaDto.codigo_pedido)

            
            return { "mensagem": "Venda cadastrada com sucesso!", "vendaId": vendaId}
            
        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.log('err: ', err)
        } finally {
            await queryRunner.release();
        }
        //const venda = this.VendaRepository.create(inserirVendaDto)
        //return this.VendaRepository.save(venda)

    }*/

    async atualizar(id: number, atualizarVendaDto: AtualizarVendaDto, user: any): Promise<Venda> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = await this.vendaRepository.update({ id: id, usuario: usuario.id }, atualizarVendaDto)

            if (resultadoAtualizacao.affected > 0) {
                return await this.vendaRepository.findOneBy({ id: id })
            } else {
                throw new EntityNotFoundError(Venda, id)
            }
        }
    }

    async deletar(id: number, user: any): Promise<void> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.vendaRepository.delete({id: id, usuario: usuario.id})

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(Venda, id)
            }
        }
    }
}
