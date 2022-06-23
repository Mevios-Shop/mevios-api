import { VendaService } from './venda.service';
import { Get, Param } from '@nestjs/common';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';

@Controller('vendas_plataforma')
export class VendaPlataformaController {

    constructor(private VendasService: VendaService) {
        
    }

    @Get(':id_plataforma')
    buscarVendaPorId(@Param() params) {
        return this.VendasService.buscarVendasPorIdPlataforma(params.id_plataforma)
    }
}
