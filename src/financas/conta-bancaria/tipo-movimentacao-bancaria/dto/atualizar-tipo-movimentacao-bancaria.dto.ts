import { PartialType } from "@nestjs/swagger";
import { InserirTipoMovimentacaoBancariaDto } from "./inserir-tipo-movimentacao-bancaria.dto";

export class AtualizarTipoMovimentacaoBancariaDto extends PartialType(InserirTipoMovimentacaoBancariaDto) {}