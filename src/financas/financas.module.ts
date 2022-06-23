import { PagamentoVendasController } from './pagamento_vendas/pagamento-vendas.controller';
import { PagamentoVendasService } from './pagamento_vendas/pagamento-vendas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoVendas } from './pagamento_vendas/entities/pagamento_vendas.entity';
import { ReceitasBancariaController } from './conta-bancaria/receita-bancaria/receitas-bancaria.controller';
import { TipoReceitaBancaria } from './conta-bancaria/tipo-receita-bancaria/entities/tipo-receita-bancaria.entity';
import { ReceitaBancaria } from './conta-bancaria/receita-bancaria/entities/receita-bancaria.entity';
import { ReceitaBancariaController } from './conta-bancaria/receita-bancaria/receita-bancaria.controller';
import { ReceitaBancariaService } from './conta-bancaria/receita-bancaria/receita-bancaria.service';
import { TipoReceitaBancariaController } from './conta-bancaria/tipo-receita-bancaria/tipo-receita-bancaria.controller';
import { DespesasDebitoController } from './conta-bancaria/despesa-debito/despesas-debito.controller';
import { DespesaDebitoService } from './conta-bancaria/despesa-debito/despesa-debito.service';
import { DespesaDebitoController } from './conta-bancaria/despesa-debito/despesa-debito.controller';
import { DespesaDebito } from './conta-bancaria/despesa-debito/entities/despesa-debito.entity';
import { TipoDespesaService } from './tipo-despesa/tipo-despesa.service';
import { TipoDespesaController } from './tipo-despesa/tipo-despesa.controller';
import { TipoDespesa } from './tipo-despesa/entities/tipo-despesa.entity';
import { PagamentoCompraCreditoController } from './pagamento-compra-credito/pagamento-compra-credito.controller';
import { PagamentoCompraCreditoService } from './pagamento-compra-credito/pagamento-compra-credito.service';
import { PagamentocompraCredito } from './pagamento-compra-credito/entities/pagamento-compra-credito.entity';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CartaoCreditoController } from './cartao-credito/cartao/cartao-credito.controller';
import { CartaoCreditoService } from './cartao-credito/cartao/cartao-credito.service';
import { CartaoCredito } from './cartao-credito/cartao/entities/cartao-credito.entity';
import { DespesaCartaoCreditoController } from './cartao-credito/despesa-cartao-credito/despesa-cartao-credito.controller';
import { DespesaCartaoCreditoService } from './cartao-credito/despesa-cartao-credito/despesa-cartao-credito.service';
import { DespesasCartaoCreditoController } from './cartao-credito/despesa-cartao-credito/despesas-cartao-credito.controller';
import { DespesaCartaoCredito } from './cartao-credito/despesa-cartao-credito/entities/despesa-cartao-credito.entity';
import { FaturaCartaoCredito } from './cartao-credito/fatura-cartao-credito/entities/fatura-cartao-credito.entity';
import { FaturaCartaoCreditoController } from './cartao-credito/fatura-cartao-credito/fatura-cartao-credito.controller';
import { FaturaCartaoCreditoService } from './cartao-credito/fatura-cartao-credito/fatura-cartao-credito.service';
import { PagamentoFaturaCartaoCredito } from './cartao-credito/pagamento-fatura-cartao-credito/entities/pagamento-fatura-cartao-credito.entity';
import { PagamentoFaturaCartaoCreditoController } from './cartao-credito/pagamento-fatura-cartao-credito/pagamento-fatura-cartao-credito.controller';
import { PagamentoFaturaCartaoCreditoService } from './cartao-credito/pagamento-fatura-cartao-credito/pagamento-fatura-cartao-credito.service';
import { ContaBancariaController } from './conta-bancaria/conta/conta-bancaria.controller';
import { ContaBancariaService } from './conta-bancaria/conta/conta-bancaria.service';
import { ContaBancaria } from './conta-bancaria/conta/entities/conta-bancaria.entity';
import { MovimentacaoBancaria } from './conta-bancaria/movimentacao-bancaria/entities/movimentacao-bancaria.entity';
import { MovimentacaoBancariaController } from './conta-bancaria/movimentacao-bancaria/movimentacao-bancaria.controller';
import { MovimentacaoBancariaService } from './conta-bancaria/movimentacao-bancaria/movimentacao-bancaria.service';
import { MovimentacoesBancariaController } from './conta-bancaria/movimentacao-bancaria/movimentacoes-bancaria.controller';
import { TipoMovimentacaoBancaria } from './conta-bancaria/tipo-movimentacao-bancaria/entities/tipo-movimentacao-bancaria.entity';
import { TipoMovimentacaoBancariaController } from './conta-bancaria/tipo-movimentacao-bancaria/tipo-movimentacao-bancaria.controller';
import { TipoMovimentacaoBancariaService } from './conta-bancaria/tipo-movimentacao-bancaria/tipo-movimentacao-bancaria.service';
import { MetodoPagamento } from './metodo-pagamento/entities/metodo-pagamento.entity';
import { MetodoPagamentoController } from './metodo-pagamento/metodo-pagamento.controller';
import { MetodoPagamentoService } from './metodo-pagamento/metodo-pagamento.service';
import { PagamentoCompraDebito } from './pagamento-compra-debito/entities/pagamento-compra-debito.entity';
import { PagamentoCompraDebitoController } from './pagamento-compra-debito/pagamento-compra-debito.controller';
import { PagamentoCompraDebitoService } from './pagamento-compra-debito/pagamento-compra-debito.service';
import { TipoReceitaBancariaService } from './conta-bancaria/tipo-receita-bancaria/tipo-receita-bancaria.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        ContaBancaria, 
        TipoMovimentacaoBancaria, 
        MovimentacaoBancaria, MetodoPagamento, 
        PagamentoCompraDebito,
        CartaoCredito,
        FaturaCartaoCredito,
        PagamentoFaturaCartaoCredito,
        DespesaCartaoCredito,
        PagamentocompraCredito,
        TipoDespesa,
        DespesaDebito,
        TipoReceitaBancaria,
        ReceitaBancaria,
        PagamentoVendas
    ])],
    controllers: [
        ContaBancariaController, 
        TipoMovimentacaoBancariaController, 
        MovimentacaoBancariaController, 
        MovimentacoesBancariaController,
        MetodoPagamentoController,
        PagamentoCompraDebitoController,
        CartaoCreditoController,
        FaturaCartaoCreditoController,
        PagamentoFaturaCartaoCreditoController,
        DespesaCartaoCreditoController,
        DespesasCartaoCreditoController,
        PagamentoCompraCreditoController,
        TipoDespesaController,
        DespesaDebitoController,
        DespesasDebitoController,
        TipoReceitaBancariaController,
        ReceitaBancariaController,
        ReceitasBancariaController,
        PagamentoVendasController
    ],
    providers: [
        ContaBancariaService, 
        TipoMovimentacaoBancariaService, 
        MovimentacaoBancariaService,
        MetodoPagamentoService,
        PagamentoCompraDebitoService,
        CartaoCreditoService,
        FaturaCartaoCreditoService,
        PagamentoFaturaCartaoCreditoService,
        DespesaCartaoCreditoService,
        PagamentoCompraCreditoService,
        TipoDespesaService,
        DespesaDebitoService,
        TipoReceitaBancariaService,
        ReceitaBancariaService,
        PagamentoVendasService
    ],
})
export class FinancasModule {}
