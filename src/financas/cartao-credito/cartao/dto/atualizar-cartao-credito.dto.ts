import { PartialType } from "@nestjs/swagger";
import { InserirCartaoCreditoDto } from "src/financas/cartao-credito/cartao/dto/inserir-cartao-credito.dto";

export class AtualizarCartaoCreditoDto extends PartialType(InserirCartaoCreditoDto){}