import { InserirPagamentoVendasDto } from './inserir-pagamento-vendas.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarPagamentoVendasDto extends PartialType(InserirPagamentoVendasDto) {}