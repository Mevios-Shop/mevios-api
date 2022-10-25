/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { StatusCompra } from '../status_compra/entities/status-compra.entity';
import { AtualizarCompraDto } from './dto/atualizar-compra.dto';
import { InserirCompraDto } from './dto/inserir-compra.dto';
import { Compra } from './entities/compra.entity';

@Injectable()
export class ComprasService {

    constructor(
        @InjectRepository(Compra) private compraRepository: Repository<Compra>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) {

    }

    async buscarCompras(user: any): Promise<Compra[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {

            return await this.compraRepository
                .createQueryBuilder("compra")
                .leftJoinAndSelect("compra.plataforma", "plataforma")
                .leftJoinAndSelect("compra.status_compra", "status_compra")
                .where("compra.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .orderBy('compra.data', 'DESC')
                .getMany()

            /*
            return this.compraRepository.find({
                where: {
                    usuario: usuario.id
                },
                order: {
                    data: "DESC"
                }
            })*/
        } else {
            return null
        }


    }

    async buscarCompraPorId(id: number, user: any): Promise<Compra> {

        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.compraRepository
                .createQueryBuilder("compra")
                .leftJoinAndSelect("compra.plataforma", "plataforma")
                .leftJoinAndSelect("compra.status_compra", "status_compra")
                .where("compra.id = :id", { id: id })
                .andWhere("compra.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .getOne()

        }

        return this.compraRepository.findOneBy({ id, usuario: user.id })
    }

    //.leftJoinAndSelect(StatusCompra, "statusCompra", "statusCompra.id = compra.statusCompraId")
    async buscarComprasPorStatusCompraId(id: number, user: any): Promise<Compra[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.compraRepository
                .createQueryBuilder("compra")
                .leftJoinAndMapMany(
                    "compra.statusCompra",
                    StatusCompra,
                    "statusCompra",
                    "compra.statusCompraId = statusCompra.id",
                )
                .leftJoinAndSelect("compra.plataforma", "plataforma")
                .leftJoinAndSelect("compra.status_compra", "status_compra")
                .where("compra.statusCompraId = :statusCompra", { statusCompra: id })
                .andWhere("compra.usuarioId = :usuarioId", { usuarioId: usuario.id })
                .orderBy('compra.data', 'DESC')
                .getMany()
        }

        return null
    }

    /*
    async buscarComprasPorStatusCompraId2(id: number) {
        return await this.compraRepository.find({
            relations: {
                plataforma: true,
                status_compra: true
            },
            where: {
                status_compra: 5
            },
            order: {
                id: "DESC"
            }
        })
    }*/

    async inserir(inserirCompraDto: InserirCompraDto, user: any): Promise<Compra> {

        let usuario: any = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            inserirCompraDto.usuario = usuario.id
            const compra = this.compraRepository.create(inserirCompraDto)
            return this.compraRepository.save(compra)
        }

        return null
    }

    async atualizar(id: number, atualizarCompraDto: AtualizarCompraDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoAtualizacao = this.compraRepository.update(id, atualizarCompraDto)

            if (!(await resultadoAtualizacao).affected) {
                throw new EntityNotFoundError(Compra, id)
            }

            return this.compraRepository.findOneBy({ id })
        }

        return null

    }

    async deletar(id: number, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultadoDelecao = await this.compraRepository.delete({ id: id, usuario: user.id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(Compra, id)
            }
        }
    }
}
