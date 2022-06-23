import { InserirStatusVendaDto } from './inserir-status-venda.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarStatusVendaDto extends PartialType(InserirStatusVendaDto) {}