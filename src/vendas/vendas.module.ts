import { VendaPedidoController } from './venda/venda-pedido.controller';
import { VendaPlataformaController } from './venda/venda-plataforma.controller';
import { StatusRastreamentoVendaService } from './status-rastreamento-venda/status-rastreamento-venda.service';
import { StatusRastreamentoVendaController } from './status-rastreamento-venda/status-rastreamento-venda.controller';
import { StatusRastreamentoVenda } from './status-rastreamento-venda/entities/status-rastreamento-venda.entity';
import { RastreamentoVenda } from './rastreamento-venda/entities/rastreamento-venda.entity';
import { RastreamentoVendaService } from './rastreamento-venda/rastreamento-venda.service';
import { RastreamentoVendaController } from './rastreamento-venda/rastreamento-venda.controller';
import { ItemVendaService } from './item-venda/item-venda.service';
import { ItensVendaController } from './item-venda/itens-venda.controller';
import { ItemVendaController } from './item-venda/item-venda.controller';
import { ItemVenda } from './item-venda/entities/item-venda.entity';
import { VendaController } from './venda/venda.controller';
import { VendaService } from './venda/venda.service';
import { Venda } from './venda/entities/venda.entity';
import { StatusVendaController } from './status-venda/status-venda.controller';
import { StatusVendaService } from './status-venda/status-venda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { StatusVenda } from './status-venda/entities/status-venda.entity';
import { RastreamentoVendaPorvendaIDController } from './rastreamento-venda/rastreamento-venda-vendaid.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { StatusVendaPorDescricaoController } from './status-venda/status-venda-por-descricao.controller';
import { ImportacaoVendaController } from './venda/importacao-venda.controller';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { ImportarVendaService } from './venda/importar-venda.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ StatusVenda, Venda, ItemVenda, RastreamentoVenda, StatusRastreamentoVenda ]), 
        forwardRef(() => UsuariosModule),
        forwardRef(() => ProdutosModule)
    ],
    controllers: [ 
        StatusVendaController, 
        StatusVendaPorDescricaoController,
        VendaController, 
        VendaPedidoController,
        VendaPlataformaController, 
        ImportacaoVendaController,
        ItemVendaController, 
        ItensVendaController, 
        RastreamentoVendaController, 
        StatusRastreamentoVendaController,
        RastreamentoVendaPorvendaIDController
    ],
    providers: [ StatusVendaService, VendaService, ImportarVendaService, ItemVendaService, RastreamentoVendaService, StatusRastreamentoVendaService ],
})
export class VendasModule {}
