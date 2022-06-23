import { InserirEstoqueDto } from './inserir-estoque.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarEstoqueDto extends PartialType(InserirEstoqueDto) {}