import { InserirVariacaoProdutoDto } from './inserir-variacao-produto.dto';
import { PartialType } from "@nestjs/swagger";
import { InserirProdutoDto } from "src/produtos/produto/dto/inserir-produto.dto";

export class AtualizarVariacaoProdutoDto extends PartialType(InserirVariacaoProdutoDto) {}