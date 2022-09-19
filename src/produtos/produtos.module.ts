import { SkuId_variacaoController } from './sku-produto/sku-id_variacao.controller';
import { SkuProdutoController } from './sku-produto/sku-produto.controller';
import { SkuProduto } from './sku-produto/entities/sku-produto.entity';
import { SkuProdutoService } from './sku-produto/sku-produto.service';
import { EstoqueController } from './estoque/estoque.controller';
import { EstoqueService } from './estoque/estoque.service';
import { Estoque } from './estoque/entities/estoque.entity';

import { ProdutosController } from './produto/produtos.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { VariacaoProduto } from './variacao-produto/entities/variacao-produto.entity';
import { ProdutosService } from './produto/produtos.service';
import { VariacaoProdutoService } from './variacao-produto/variacao-produto.service';
import { VariacaoProdutoController } from './variacao-produto/variacao-produto.controller';
import { VariacoesProdutoController } from './variacao-produto/variacoes-produto.controller';
import { EstoqueDisponivelController } from './estoque/estoque-disponivel.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
    imports: [TypeOrmModule.forFeature([Produto, VariacaoProduto, Estoque, SkuProduto]), forwardRef(() => UsuariosModule)],
    controllers: [
      ProdutosController, 
      VariacaoProdutoController, 
      VariacoesProdutoController, 
      EstoqueController, 
      SkuProdutoController, 
      SkuId_variacaoController, 
      EstoqueDisponivelController
    ],
    providers: [ProdutosService, VariacaoProdutoService, EstoqueService, SkuProdutoService ],
    exports: [ EstoqueService ]
  })
  export class ProdutosModule {}
