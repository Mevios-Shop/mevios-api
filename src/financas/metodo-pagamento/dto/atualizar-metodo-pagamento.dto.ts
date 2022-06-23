import { PartialType } from "@nestjs/swagger";
import { InserirMetodoPagamentoDto } from "./inserir-metodo-pagamento.dto";

export class AtualizarMetodoPagamentoDto extends PartialType(InserirMetodoPagamentoDto) {}