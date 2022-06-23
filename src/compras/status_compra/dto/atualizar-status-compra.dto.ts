import { PartialType } from "@nestjs/swagger";
import { InserirStatusCompraDto } from "./inserir-status-compra.dto";

export class AtualizarStatusCompraDto extends PartialType(InserirStatusCompraDto) {}