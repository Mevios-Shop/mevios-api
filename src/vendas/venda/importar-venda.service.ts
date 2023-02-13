import { forwardRef, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Estoque } from "src/produtos/estoque/entities/estoque.entity";
import { EstoqueService } from "src/produtos/estoque/estoque.service";
import { UsuarioService } from "src/usuarios/usuario.service";
import { DataSource } from "typeorm";
import { InserirItemVendaDto } from "../item-venda/dto/inserir-item-venda.dto";
import { ItemVenda } from "../item-venda/entities/item-venda.entity";
import { InserirRastreamentoVendaDto } from "../rastreamento-venda/dto/inserir-rastreamento-venda.dto";
import { RastreamentoVenda } from "../rastreamento-venda/entities/rastreamento-venda.entity";
import { StatusVenda } from "../status-venda/entities/status-venda.entity";
import { ImportarVendaDto } from "./dto/importar-venda.dto";
import { InserirVendaDto } from "./dto/inserir-venda.dto";
import { Venda } from "./entities/venda.entity";

export class ImportarVendaService {
    constructor(
        @Inject(forwardRef(() => EstoqueService)) private estoqueService: EstoqueService,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService,
        private dataSource: DataSource
    ) {
    }

    async importarVendas(importarVendasDto: ImportarVendaDto[], user: any): Promise<any> {

        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }

            for (let index = 0; index < importarVendasDto.length; index++) {
                const venda = importarVendasDto[index];

                if (venda.codigo_pedido == '220624N436MNDF') {
                    console.log(venda.codigo_pedido)
                }

                const vendaJaCadastrada = await queryRunner.manager.createQueryBuilder(Venda, "venda")
                    .where("venda.codigo_pedido = :codigo_pedido", { codigo_pedido: venda.codigo_pedido })
                    .getOne();

                if (!vendaJaCadastrada) {

                    const status_venda: StatusVenda = await queryRunner.manager.findOne(StatusVenda, {
                        where: {
                            descricao: venda.status_venda
                        }
                    })

                    if (!status_venda) {
                        throw new Error(`O status: ${venda.status_venda} da venda: ${venda.codigo_pedido} não foi encontrado`);
                    }
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

                    const vendaInserida = await queryRunner.manager.save(Venda, inserirVendaDto)

                    if (!vendaInserida) {
                        throw new Error("Erro ao inserir venda: " + venda.codigo_pedido);
                    } else {

                        for (let index2 = 0; index2 < venda.itensVenda.length; index2++) {
                            const item = venda.itensVenda[index2];

                            const listaEstoqueDisponivel2: Estoque[] = await this.estoqueService.buscarProdutosDisponiveisPorVariacaoId(item.variacao_produto, item.quantidade, user)

                            const listaEstoqueDisponivel: Estoque[] = await queryRunner.manager.createQueryBuilder(Estoque, "estoque")
                                .where("estoque.variacao_produto = :variacao_produto", { variacao_produto: item.variacao_produto })
                                .andWhere("estoque.usuario = :usuario", { usuario: usuario.id })
                                .andWhere("estoque.id NOT IN (SELECT estoqueId FROM item_venda)")
                                .limit(item.quantidade)
                                .getMany();

                            if (listaEstoqueDisponivel.length < item.quantidade) {
                                throw new Error("Estoque insuficiente para o item " + item.variacao_produto + " da venda " + venda.codigo_pedido);
                            } else {

                                let itensInseridos: ItemVenda[] = []

                                for (let index3 = 0; index3 < item.quantidade; index3++) {

                                    const inserirItemVendaDto: InserirItemVendaDto = {
                                        valor: item.valor,
                                        variacao_produto: item.variacao_produto,
                                        venda: vendaInserida.id,
                                        estoque: listaEstoqueDisponivel[index3].id,
                                        usuario: usuario.id
                                    }

                                    const itemInserido = await queryRunner.manager.save(ItemVenda, inserirItemVendaDto)

                                    itensInseridos.push(itemInserido)

                                }

                                if (itensInseridos.length != item.quantidade) {
                                    throw new Error("Erro ao importar itens da venda " + venda.codigo_pedido)
                                }
                            }
                        }

                        if (venda.codigo_rastreamento) {
                            const inserirRastreamentoVendaDto: InserirRastreamentoVendaDto = {
                                codigo_rastreamento: venda.codigo_rastreamento,
                                venda: vendaInserida.id,
                                custo_frete: vendaInserida.valor_frete,
                                plataforma: vendaInserida.plataforma,
                                usuario: usuario.id
                            }

                            const rastreamento = await queryRunner.manager.save(RastreamentoVenda, inserirRastreamentoVendaDto)

                            if (!rastreamento) {
                                throw new Error("Erro ao importar rastreamento da venda " + venda.codigo_pedido)
                            }
                        }
                    }


                }
            }

            let QuantidadeVendasCadastradasComSucesso: number = 0
            8
            for (let index = 0; index < importarVendasDto.length; index++) {
                const venda = importarVendasDto[index];

                const vendaJaCadastrada = await queryRunner.manager.createQueryBuilder(Venda, "venda")
                    .where("venda.codigo_pedido = :codigo_pedido", { codigo_pedido: venda.codigo_pedido })
                    .getOne();

                if (!vendaJaCadastrada) {
                    throw new Error("Erro ao importar venda " + venda.codigo_pedido)
                } else {

                    const itensVendaJaCadastrado: ItemVenda[] = await queryRunner.manager.createQueryBuilder(ItemVenda, "itemVenda")
                        .where("itemVenda.venda = :venda", { venda: vendaJaCadastrada.id })
                        .getMany();

                    const somaItensVenda = venda.itensVenda.reduce((a, b) => a + b.quantidade, 0)

                    if (itensVendaJaCadastrado.length != somaItensVenda) {
                        throw new Error("Erro ao importar itens da venda " + venda.codigo_pedido)
                    } else {
                        if (venda.codigo_rastreamento) {
                            const rastreamentoVendaJaCadastrado = await queryRunner.manager.createQueryBuilder(RastreamentoVenda, "rastreamentoVenda")
                                .where("rastreamentoVenda.venda = :venda", { venda: vendaJaCadastrada.id })
                                .getOne();

                            if (!rastreamentoVendaJaCadastrado) {
                                throw new Error("Erro ao importar rastreamento da venda " + venda.codigo_pedido)
                            }
                        }

                        QuantidadeVendasCadastradasComSucesso++
                    }
                }

            }

            if (QuantidadeVendasCadastradasComSucesso == importarVendasDto.length) {
                await queryRunner.commitTransaction();
                return {
                    mensagem: "Vendas importadas com sucesso"
                }
            } else {

                throw new Error("Erro ao importar vendas: " + QuantidadeVendasCadastradasComSucesso + " vendas importadas com sucesso de " + importarVendasDto.length)
            }


        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error)
            return new HttpException({ message: 'Não foi possível inserir as vendas' }, HttpStatus.BAD_REQUEST);
        }

        /*finally {
            await queryRunner.release();
        }*/
    }
}