import { PartialType } from "@nestjs/swagger";
import { InserirStatusItemCompraDto } from "./inserir-status-item-compra.dto";

export class AtualizarStatusItemCompraDto extends PartialType(InserirStatusItemCompraDto) {}