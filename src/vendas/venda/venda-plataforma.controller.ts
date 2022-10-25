import { VendaService } from './venda.service';
import { Get, Param, Request, UseGuards } from '@nestjs/common';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('vendas_plataforma')
export class VendaPlataformaController {

    constructor(private VendasService: VendaService) {
        
    }

    @Get(':id_plataforma')
    @UseGuards(JwtAuthGuard)
    async buscarVendaPorId(@Param() params, @Request() req) {
        return await this.VendasService.buscarVendasPorIdPlataforma(params.id_plataforma, req.user)
    }
}
