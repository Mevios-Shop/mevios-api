import { PartialType } from "@nestjs/swagger";
import { InserirPagamentoFaturaCartaoCreditoDto } from "./inserir-pagamento-fatura-cartao-credito.dto";

export class AtualizarPagamentoFaturaCartaoCreditoDto extends PartialType(InserirPagamentoFaturaCartaoCreditoDto) {}