import { InserirDespesaDebitoDto } from './inserir-despesa-debito.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarDespesaDebitoDto extends PartialType(InserirDespesaDebitoDto) {}