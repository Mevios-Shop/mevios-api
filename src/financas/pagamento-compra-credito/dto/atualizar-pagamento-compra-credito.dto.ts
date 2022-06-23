import { InserirPagamentoCompraCreditoDto } from './inserir-pagamento-compra-credito.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarPagamentoCompraCreditoDto extends PartialType(InserirPagamentoCompraCreditoDto) {}