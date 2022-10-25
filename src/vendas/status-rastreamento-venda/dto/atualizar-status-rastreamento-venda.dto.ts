import { InserirStatusRastreamentoVendaDto } from './inserir-status-rastreamento-venda.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarStatusRastreamentovendaDto extends PartialType(InserirStatusRastreamentoVendaDto) {}