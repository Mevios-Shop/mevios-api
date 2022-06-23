import { InserirTipoReceitaBancariaDto } from './inserir-tipo-receita-bancaria.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarTipoReceitaBancariaDto extends PartialType(InserirTipoReceitaBancariaDto) {}