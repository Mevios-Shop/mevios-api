import { PartialType } from "@nestjs/swagger";
import { InserirMovimentacaoBancariaDto } from "./inserir-movimentacao-bancaria.dto";

export class AtualizarMovimentacaoBancariaDto extends PartialType(InserirMovimentacaoBancariaDto) {}