import { PartialType } from "@nestjs/swagger";
import { InserirDespesaCartaoCreditoDto } from "./inserir-despesa-cartao-credito.dto";

export class AtualizarDespesaCartaoCreditoDto extends PartialType(InserirDespesaCartaoCreditoDto) {}