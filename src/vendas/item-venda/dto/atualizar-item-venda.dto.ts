import { InserirItemVendaDto } from './inserir-item-venda.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarItemVendaDto extends PartialType(InserirItemVendaDto) {}