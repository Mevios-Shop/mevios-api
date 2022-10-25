import { InserirItemVendaDto } from './inserir-item-venda.dto';
export class ItensVendaDto {
    inserirItemVendaDto: Array<InserirItemVendaDto>

    constructor(inserirItemVendaDto: InserirItemVendaDto[]) {
        this.inserirItemVendaDto = inserirItemVendaDto
    }
}