import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { ImportarItemVendaDto } from "src/vendas/item-venda/dto/importar-item-venda.dto";

export class ImportarVendaDto {

    @IsNotEmpty({ message: 'O campo "codigo_pedido" é obrigatório' })
    @IsString({ message: 'O campo "codigo_pedido" deve ser uma string' })
    @MinLength(5, { message: 'O campo "codigo_pedido" deve ter no mínimo 5 caracteres' })
    codigo_pedido: string;

    @IsString({ message: 'O campo "codigo_rastreamento" deve ser uma string' })
    codigo_rastreamento: string;

    @IsNotEmpty({ message: 'O campo "comissao" é obrigatório' })
    @IsNumber({}, { message: 'O campo "comissao" deve ser um número' })
    comissao: number;

    @IsNotEmpty({ message: 'O campo "data" é obrigatório' })
    @IsDate({ message: 'O campo "data" deve ser uma data' })
    data: Date;

    @IsNotEmpty({ message: 'O campo "itensVenda" é obrigatório' })
    @IsArray({ message: 'O campo "itensVenda" deve ser um array' })
    @MinLength(1, { message: 'O campo "itensVenda" deve ter no mínimo 1 item' })
    itensVenda: ImportarItemVendaDto[];

    @IsNotEmpty({ message: 'O campo "plataforma" é obrigatório' })
    @IsInt({ message: 'O campo "plataforma" deve ser um número inteiro' })
    @IsPositive({ message: 'O campo "plataforma" deve ser um número positivo' })
    plataforma: number;

    @IsNotEmpty({ message: 'O campo "status_venda" é obrigatório' })
    @IsString({ message: 'O campo "status_venda" deve ser uma string' })
    status_venda: string;

    @IsString({ message: 'O campo "transportadora" deve ser uma string' })
    transportadora?: string;

    @IsNotEmpty({ message: 'O campo "usuario" é obrigatório' })
    @IsInt({ message: 'O campo "usuario" deve ser um número inteiro' })
    usuario: number;

    @IsNumber({}, { message: 'O campo "valor_frete" deve ser um número' })
    valor_frete?: number;

    @IsNumber({}, { message: 'O campo "valor_reembolso" deve ser um número' })
    valor_reembolso?: number;



}