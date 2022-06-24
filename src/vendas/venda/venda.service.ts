import { ItensVendaDto } from './../item-venda/dto/itens-venda.dto';
import { InserirRastreamentoVendaDto } from './../rastreamento-venda/dto/inserir-rastreamento-venda.dto';
import { InserirItemVendaDto } from './../item-venda/dto/inserir-item-venda.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { InserirVendaDto } from './dto/inserir-venda.dto';
import { Venda } from './entities/venda.entity';

@Injectable()
export class VendaService {

    constructor(@InjectRepository(Venda) private VendaRepository: Repository<Venda>, private connection: Connection) {
        
    }

    buscarVendas(): Promise<Venda[]> {
        return this.VendaRepository.find({
            order: {
                data: "DESC"
            }
        })
    }

    buscarVendaPorId(id: number): Promise<Venda> {
        return this.VendaRepository.findOne(id)
    }

    buscarVendasPorIdPlataforma(id_plataforma: number): Promise<Venda[]> {
        return this.VendaRepository.find({ where: { plataforma: 2 } })
    }

    buscarVendaPorPedido(codigo_pedido: number): Promise<Venda> {
        return this.VendaRepository.findOne({ where: { codigo_pedido: codigo_pedido } })
    }

    inserir(inserirVendaDto: InserirVendaDto) {
        const venda = this.VendaRepository.create(inserirVendaDto)
        
        return this.VendaRepository.save(inserirVendaDto)
    }

    async inserir2(inserirVendaDto: InserirVendaDto, itensVendaDto: ItensVendaDto, inserirRastreamentoVendaDto: InserirRastreamentoVendaDto, venda_completa: JSON) {
        
        const queryRunner = this.connection.createQueryRunner()

        await queryRunner.connect()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const venda = this.VendaRepository.create(inserirVendaDto)

            await queryRunner.manager.save(inserirVendaDto)

            const vendaId = await queryRunner.query('SELECT id FROM bd_api_vendas.venda WHERE codigo_pedido = ' + inserirVendaDto.codigo_pedido)

            
            /*
            for (let i; itensVendaDto;) {
                i.venda = vendaId
                i.estoque = queryRunner.query("SELECT E.id FROM bd_api_vendas.estoque AS E LEFT JOIN bd_api_vendas.item_venda AS iv ON iv.estoqueId = E.id INNER JOIN bd_api_vendas.variacao_produto	AS VP ON vp.id = E.variacaoProdutoId INNER JOIN bd_api_vendas.produto AS P ON P.id = VP.produtoId WHERE E.id not in(SELECT estoqueId from bd_api_vendas.item_venda) AND E.variacaoProdutoId = " + i.variacao_produto +" ORDER BY	E.data LIMIT 1;")
                await queryRunner.manager.save(i)                
            }

            inserirRastreamentoVendaDto._venda = vendaId
            
            await queryRunner.manager.save(inserirRastreamentoVendaDto)
            */
            return { "mensagem": "Venda cadastrada com sucesso!", "vendaId": vendaId}
            
        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.log('err: ', err)
        } finally {
            await queryRunner.release();
        }
        //const venda = this.VendaRepository.create(inserirVendaDto)
        //return this.VendaRepository.save(venda)

    }

    async atualizar(id: number, atualizarVendaDto: AtualizarVendaDto) {
        const resultadoAtualizacao = this.VendaRepository.update(id, atualizarVendaDto)

        if (!(await resultadoAtualizacao).affected) {
            throw new EntityNotFoundError(Venda, id)
        }

        return this.VendaRepository.findOne(id)
    }

    async deletar(id: number) {
        const resultadoDelecao = await this.VendaRepository.delete(id)

        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(Venda, id)
        }
    }
}
