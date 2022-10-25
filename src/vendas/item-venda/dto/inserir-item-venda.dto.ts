import { IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class InserirItemVendaDto {

    @IsNotEmpty({ message: 'O campo "estoque" é obrigatório' })
    @IsNumber()
    estoque: number

    @IsNotEmpty({ message: 'O campo "variacao_produto" é obrigatório' })
    @IsInt({ message: 'O valor deve ser um número inteiro' })
    variacao_produto: number

    @IsNotEmpty({ message: 'O campo "venda" é obrigatório' })
    @IsNumber()
    venda: number

    @IsNotEmpty({ message: 'O campo "valor" é obrigatório' })
    valor: number

    @IsNumber()
    usuario: number

}