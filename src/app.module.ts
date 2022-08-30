import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendasModule } from './vendas/vendas.module';
import { ComprasModule } from './compras/compras.module';
import { ProdutosModule } from './produtos/produtos.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlataformasModule } from './plataformas/plataformas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST') || process.env.MYSQL_HOST,
        port: +configService.get('MYSQL_PORT') || +process.env.MYSQL_PORT,
        username: configService.get('MYSQL_USERNAME') || process.env.MYSQL_USERNAME,
        password: configService.get('MYSQL_PASSWORD') || process.env.MYSQL_PASSWORD,
        database: configService.get('MYSQL_DATABASE') || process.env.MYSQL_DATABASE,
        entities: [__dirname + configService.get('MYSQL_ENTITIES')] || [__dirname + process.env.MYSQL_ENTITIES],
        autoLoadEntities: Boolean(Number(configService.get<boolean>('MYSQL_AUTO_LOAD_ENTITIES'))) || Boolean(Number(process.env.MYSQL_AUTO_LOAD_ENTITIES)),
        synchronize: Boolean(Number(configService.get<boolean>('MYSQL_SYNCHRONIZE'))) || Boolean(Number(process.env.MYSQL_SYNCHRONIZE)),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ComprasModule,
    PlataformasModule,
    ProdutosModule,
    UsuariosModule,
    VendasModule
  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
