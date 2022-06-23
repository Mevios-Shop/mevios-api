import { AtualizarStatusVendaDto } from './dto/atualizar-status-venda.dto';
import { StatusVenda } from './entities/status-venda.entity';
import { InserirStatusVendaDto } from './dto/inserir-status-venda.dto';
import { StatusVendaService } from './status-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('status_venda')
export class StatusVendaController {

    constructor(private statusVendaService: StatusVendaService) {
        
    }

    @Post()
    inserir(@Body() inserirStatusVendaDto: InserirStatusVendaDto) {
        return this.statusVendaService.inserir(inserirStatusVendaDto)
    }

    @Get()
    buscarStatusVenda(): Promise<StatusVenda[]> {
        return this.statusVendaService.buscarStatusVenda()
    }

    @Get(':id')
    buscarStatusVendaPorId(@Param() params) {
        return this.statusVendaService.buscarStatusVendaPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: number, @Body() atualizarStatusVendaDto: AtualizarStatusVendaDto) {
        return this.statusVendaService.atualizar(id, atualizarStatusVendaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: number) {
        return this.statusVendaService.deletar(id)
    }
}
