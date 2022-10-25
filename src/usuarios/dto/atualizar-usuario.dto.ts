import { InserirUsuarioDto } from './inserir-usuario.dto';
import { PartialType } from '@nestjs/swagger';
export class AtualizarUsuarioDto extends PartialType(InserirUsuarioDto) {}