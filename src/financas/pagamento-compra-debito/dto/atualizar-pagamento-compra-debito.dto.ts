import { PartialType } from "@nestjs/swagger";
import { InserirCompraDto } from "src/compras/compra/dto/inserir-compra.dto";

export class AtualizarPagamentoCompraDebitoDto extends PartialType(InserirCompraDto) {}