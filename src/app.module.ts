import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendasModule } from './vendas/vendas.module';
import { ComprasModule } from './compras/compras.module';
import { ProdutosModule } from './produtos/produtos.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlataformasModule } from './plataformas/plataformas.module';

@Module({
  imports: [
    UsuariosModule,
    ProdutosModule,
    VendasModule,
    ComprasModule,
    TypeOrmModule.forRoot(),
    ProdutosModule,
    PlataformasModule
  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
