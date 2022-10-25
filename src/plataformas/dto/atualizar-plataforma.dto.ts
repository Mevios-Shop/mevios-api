import { PartialType } from "@nestjs/swagger";
import { InserirPlataformaDto } from "./inserir-plataforma.dto";

export class AtualizarPlataformaDto extends PartialType(InserirPlataformaDto) {}