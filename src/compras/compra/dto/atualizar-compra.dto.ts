import { PartialType } from "@nestjs/swagger";
import { InserirCompraDto } from "./inserir-compra.dto";

export class AtualizarCompraDto extends PartialType(InserirCompraDto) {}