import { InserirVendaDto } from './inserir-venda.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarVendaDto extends PartialType(InserirVendaDto) {}