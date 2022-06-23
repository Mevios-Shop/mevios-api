import { InserirSkuProdutoDto } from './inserir-sku-produto.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarSkuProdutoDto extends PartialType(InserirSkuProdutoDto) {}