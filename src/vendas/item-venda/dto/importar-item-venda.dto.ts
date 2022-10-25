import { IsInt, IsNotEmpty, IsNumber, IsPositive, isPositive } from "class-validator"

export class ImportarItemVendaDto {

    @IsNotEmpty({ message: 'O campo "variacao_produto" é obrigatório' })
    @IsInt({ message: 'O campo "variacao_produto" deve ser um número inteiro' })
    @IsPositive({ message: 'O campo "variacao_produto" deve ser um número positivo' })
    variacao_produto: number

    @IsNotEmpty({ message: 'O campo "valor" é obrigatório' })
    @IsNumber({}, { message: 'O campo "valor" deve ser um número' })
    valor: number
    
    @IsNotEmpty({ message: 'O campo "quantidade" é obrigatório' })
    @IsInt({ message: 'O campo "quantidade" deve ser um número inteiro' })
    @IsPositive({ message: 'O campo "quantidade" deve ser um número positivo' })
    quantidade: number

    @IsNotEmpty({ message: 'O campo "usuario" é obrigatório' })
    @IsInt({ message: 'O campo "usuario" deve ser um número inteiro' })
    usuario: number;
}