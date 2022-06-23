import { PartialType } from "@nestjs/swagger";
import { InserirContaBancariaDto } from "./inserir-conta-bancaria.dto";

export class AtualizarContaBancariaDto extends PartialType(InserirContaBancariaDto) {}