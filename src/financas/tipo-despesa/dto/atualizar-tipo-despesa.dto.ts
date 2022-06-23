import { InserirTipoDespesaDto } from './inserir-tipo-despesa.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarTipoDespesaDto extends PartialType(InserirTipoDespesaDto) {}