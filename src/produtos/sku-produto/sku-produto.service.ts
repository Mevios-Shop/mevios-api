import { AtualizarSkuProdutoDto } from './dto/atualizar-sku-produto.dto';
import { InserirSkuProdutoDto } from './dto/inserir-sku-produto.dto';
import { SkuProduto } from './entities/sku-produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository, EntityNotFoundError } from 'typeorm';
import { UsuarioService } from 'src/usuarios/usuario.service';

@Injectable()
export class SkuProdutoService {

    constructor(
        @InjectRepository(SkuProduto) private skuProdutoRepository: Repository<SkuProduto>,
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioService: UsuarioService
    ) { }

    async buscarTodos(user: any): Promise<SkuProduto[]> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.skuProdutoRepository
                .createQueryBuilder("sku_produto")
                .leftJoinAndSelect("sku_produto.plataforma", "plataforma")
                .leftJoinAndSelect("sku_produto.variacao_produto", "variacao_produto")
                .getMany()
        }
        return null
    }

    async buscarPorId(id: number, user: any): Promise<SkuProduto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.skuProdutoRepository
                .createQueryBuilder("sku_produto")
                .leftJoinAndSelect("sku_produto.plataforma", "plataforma")
                .leftJoinAndSelect("sku_produto.variacao_produto", "variacao_produto")
                .where("sku_produto.id = :id", { id: id })
                .getOne()
        }
        return null
    }

    async buscarVariacaoPorSku(sku: string, plataformaId: number, user: any): Promise<SkuProduto> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            return await this.skuProdutoRepository
                .createQueryBuilder("sku_produto")
                .leftJoinAndSelect("sku_produto.plataforma", "plataforma")
                .leftJoinAndSelect("sku_produto.variacao_produto", "variacao_produto")
                .andWhere("sku_produto.sku = :sku", { sku: sku })
                .getOne()
        }
        return null
    }

    async inserir(inserirSkuProdutoDto: InserirSkuProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const sku_produto = this.skuProdutoRepository.create(inserirSkuProdutoDto)
            return await this.skuProdutoRepository.save(sku_produto)
        }
        return null
    }

    async atualizar(id: number, atualizarSkuProdutoDto: AtualizarSkuProdutoDto, user: any) {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultado = await this.skuProdutoRepository.update(id, atualizarSkuProdutoDto)
            if (resultado.affected === 0) {
                throw new EntityNotFoundError(SkuProduto, id)
            } else {
                return this.skuProdutoRepository.findOneBy({ id })
            }
        }
        return null
    }

    async deletar(id: number, user: any): Promise<any> {
        const usuario = await this.usuarioService.buscarPorEmail(user.email)

        if (usuario) {
            const resultado = await this.skuProdutoRepository.delete({ id: id })
            if (resultado.affected === 0) {
                throw new EntityNotFoundError(SkuProduto, id)
            }
        }
        return null

        /*
        const resultadoDelecao = await this.skuProdutoRepository.delete(id)
        if (!(await resultadoDelecao).affected) {
            throw new EntityNotFoundError(SkuProduto, id)
        }*/
    }
}
