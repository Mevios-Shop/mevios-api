import { PartialType } from "@nestjs/swagger";
import { InserirProdutoDto } from "./inserir-produto.dto";

export class AtualizarProdutoDto extends PartialType(InserirProdutoDto) {}