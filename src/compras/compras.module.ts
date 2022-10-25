/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { CompraPorStatusController } from './compra/compra-por-status.controller';
import { ComprasController } from './compra/compras.controller';
import { ComprasService } from './compra/compras.service';
import { Compra } from './compra/entities/compra.entity';
import { ItemCompra } from './itens_compra/item_compra/entities/item-compra.entity';
import { ItemCompraController } from './itens_compra/item_compra/item-compra.controller';
import { ItemCompraService } from './itens_compra/item_compra/item-compra.service';
import { ItensCompraController } from './itens_compra/item_compra/itens-compra.controller';
import { StatusItemCompra } from './itens_compra/status_item_compra/entities/status-item-compra.entity';
import { StatusItemCompraController } from './itens_compra/status_item_compra/status-item-compra.controller';
import { StatusItemCompraService } from './itens_compra/status_item_compra/status-item-compra.service';
import { StatusCompra } from './status_compra/entities/status-compra.entity';
import { StatusCompraController } from './status_compra/status-compra.controller';
import { StatusCompraService } from './status_compra/status-compra.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Compra,
                StatusCompra,
                Plataforma,
                ItemCompra,
                StatusItemCompra
            ]
        ),
        forwardRef(() => UsuariosModule)
    ],
    controllers: [
        ComprasController,
        StatusCompraController,
        ItemCompraController,
        ItensCompraController,
        StatusItemCompraController,
        CompraPorStatusController
    ],
    providers: [
        ComprasService,
        StatusCompraService,
        ItemCompraService,
        StatusItemCompraService
    ]
})
export class ComprasModule { }
