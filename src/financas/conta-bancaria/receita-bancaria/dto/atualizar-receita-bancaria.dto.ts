import { InserirReceitaBancariaDto } from './inserir-receita-bancaria.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarReceitaBancariaDto extends PartialType(InserirReceitaBancariaDto) {}