import { PartialType } from "@nestjs/swagger";
import { InserirItemCompraDto } from "./inserir-item-compra.dto";

export class AtualizarItemCompraDto extends PartialType(InserirItemCompraDto) {}