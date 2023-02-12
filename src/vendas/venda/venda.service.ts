import { ItensVendaDto } from './../item-venda/dto/itens-venda.dto';
import { InserirRastreamentoVendaDto } from './../rastreamento-venda/dto/inserir-rastreamento-venda.dto';
import { InserirItemVendaDto } from './../item-venda/dto/inserir-item-venda.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { InserirVendaDto } from './dto/inserir-venda.dto';
import { Venda } from './entities/venda.entity';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { ImportarVendaDto } from './dto/importar-venda.dto';
import { Estoque } from 'src/produtos/estoque/entities/estoque.entity';
import { EstoqueService } from 'src/produtos/estoque/estoque.service';
import { StatusVenda } from '../status-venda/entities/status-venda.entity';
import { StatusVendaService } from '../status-venda/status-venda.service';
import { ItemVenda } from '../item-venda/entities/item-venda.entity';
import { RastreamentoVenda } from '../rastreamento-venda/entities/rastreamento-venda.entity';
import { ItemVendaService } from '../item-venda/item-venda.service';

@Injectable()
export class VendaService {

    constructor(
        @InjectRepository(Venda) private vendaRepository: Repository<Venda>,
        @InjectRepository(ItemVenda) private itemVendaRepository: Repository<ItemVenda>,
        @InjectRepository(RastreamentoVenda) private rastreamentoVendaRepository: Repository<RastreamentoVenda>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService,
        private readonly estoqueService: EstoqueService,
        private readonly itemVendaService: ItemVendaService,
        @Inject(forwardRef(() => StatusVendaService))
        private readonly statusVendaService: StatusVendaService,
        private dataSource: DataSource
    ) {

    }

    async buscar(user: any): Promise<Venda[]> {
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

    async buscarPorId(id: number, user: any): Promise<Venda> {
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

    async buscarPorIdPlataforma(id_plataforma: number, user: any): Promise<Venda[]> {
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

    async buscarPorPedido(codigo_pedido: string, user: any): Promise<Venda> {
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

    async importarVendas(importarVendasDto: ImportarVendaDto[], user: any): Promise<any> {

        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {


            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            let vendasInseridasSemSucesso: boolean = false

            try {

                importarVendasDto.forEach(async (venda) => {

                    const vendaJaCadastrada = await this.buscarPorPedido(venda.codigo_pedido, user)

                    if (!vendaJaCadastrada) {

                        const status_venda: StatusVenda = await this.statusVendaService.buscarPorDescricao(venda.status_venda, user)
                        const inserirVendaDto: InserirVendaDto = {
                            data: venda.data,
                            comissao: venda.comissao,
                            valor_frete: venda.valor_frete,
                            valor_reembolso: venda.valor_reembolso,
                            codigo_pedido: venda.codigo_pedido,
                            plataforma: venda.plataforma,
                            status_venda: status_venda.id,
                            usuario: usuario.id,
                        }

                        const vendaInserida = await this.vendaRepository.save(inserirVendaDto)


                        venda.itensVenda.forEach(async (item) => {

                            const listaEstoque: Estoque[] = await this.estoqueService.buscarProdutosDisponiveisPorVariacaoId(item.variacao_produto, item.quantidade, user)

                            console.log('codigo_pedido: ', venda.codigo_pedido, 'item: ', item, 'estoque.length: ', listaEstoque.length, 'item.quantidade: ', item.quantidade)
                            if (listaEstoque.length === item.quantidade) {
                                for (let index = 0; index < item.quantidade; index++) {
                                    const estoque = await this.estoqueService.buscarProdutoDisponivelPorVariacaoId(item.variacao_produto, user)
                                    const inserirItemVendaDto: InserirItemVendaDto = {
                                        estoque: estoque.id,
                                        variacao_produto: item.variacao_produto,
                                        venda: vendaInserida.id,
                                        valor: item.valor,
                                        usuario: usuario.id
                                    }

                                    await this.itemVendaRepository.save(inserirItemVendaDto)

                                    if (venda.codigo_rastreamento) {
                                        const inserirRastreamentoVendaDto: InserirRastreamentoVendaDto = {
                                            codigo_rastreamento: venda.codigo_rastreamento,
                                            venda: vendaInserida.id,
                                            custo_frete: vendaInserida.valor_frete,
                                            plataforma: vendaInserida.plataforma['id'],
                                            usuario: usuario.id
                                        }
                                        await this.rastreamentoVendaRepository.save(inserirRastreamentoVendaDto)
                                    }
                                }
                            } else {
                                throw new HttpException(`Produto ${item.variacao_produto} não possui estoque suficiente`, HttpStatus.BAD_REQUEST)
                            }
                        })
                    }
                })

                let vendasInseridasComSucesso: boolean = true

                importarVendasDto.forEach(async (venda) => {
                    const vendaJaCadastrada = await this.buscarPorPedido(venda.codigo_pedido, user)
                    if (vendaJaCadastrada) {
                        const itensDaVendaCadastrada = await this.itemVendaService.buscarPorIdVenda(vendaJaCadastrada.id, user)

                        if (itensDaVendaCadastrada.length === venda.itensVenda.length) {
                            vendasInseridasComSucesso = true
                        } else {
                            vendasInseridasComSucesso = false
                            throw new HttpException(`Um ou mais itens da venda ${venda.codigo_pedido} não foram inseridos`, HttpStatus.BAD_REQUEST)
                        }
                    } else {
                        vendasInseridasComSucesso = false
                        throw new HttpException(`Venda ${venda.codigo_pedido} não foi inserida com sucesso`, HttpStatus.BAD_REQUEST)
                    }
                })

                if (vendasInseridasComSucesso) {
                    await queryRunner.commitTransaction();

                    return { message: 'Vendas importadas com sucesso!' }
                } else {
                    throw new HttpException('Vendas não foram importadas com sucesso', HttpStatus.BAD_REQUEST)
                }
            } catch (err) {
                await queryRunner.rollbackTransaction();
                console.log('err: ', err)
            } finally {
                await queryRunner.release();
            }

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
            const resultadoDelecao = await this.vendaRepository.delete({ id: id, usuario: usuario.id })

            if (!(await resultadoDelecao).affected) {
                throw new EntityNotFoundError(Venda, id)
            }
        }
    }
}
