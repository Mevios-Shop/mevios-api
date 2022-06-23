import { PartialType } from "@nestjs/swagger";
import { InserirFaturaCartaoCreditoDto } from "./inserir-fatura-cartao-credito.dto";

export class AtualizarFaturaCartaoCreditoDto extends PartialType(InserirFaturaCartaoCreditoDto) {}