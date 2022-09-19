/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ImportarVendaDto } from './dto/importar-venda.dto';
import { ImportarVendaService } from './importar-venda.service';
import { VendaService } from './venda.service';

@Controller('venda/importacao')
export class ImportacaoVendaController { 

    constructor(private readonly importarVendaService: ImportarVendaService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async importarVendas(@Body() importarVendaDto: ImportarVendaDto[], @Request() req) {
        return await this.importarVendaService.importarVendas(importarVendaDto, req.user)
    }
}
