import { InserirRastreamentoVendaDto } from './inserir-rastreamento-venda.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarRastreamentoVendaDto extends PartialType(InserirRastreamentoVendaDto) {}