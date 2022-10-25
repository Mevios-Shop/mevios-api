import { AtualizarStatusVendaDto } from './dto/atualizar-status-venda.dto';
import { StatusVenda } from './entities/status-venda.entity';
import { InserirStatusVendaDto } from './dto/inserir-status-venda.dto';
import { StatusVendaService } from './status-venda.service';
/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('status_venda')
export class StatusVendaController {

    constructor(private statusVendaService: StatusVendaService) {
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirStatusVendaDto: InserirStatusVendaDto, @Request() req) {
        return await this.statusVendaService.inserir(inserirStatusVendaDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarStatusVenda(@Request() req): Promise<StatusVenda[]> {
        return await this.statusVendaService.buscarStatusVenda(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarStatusVendaPorId(@Param() params, @Request() req) {
        return await this.statusVendaService.buscarStatusVendaPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: number, @Body() atualizarStatusVendaDto: AtualizarStatusVendaDto, @Request() req) {
        return await this.statusVendaService.atualizar(id, atualizarStatusVendaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: number, @Request() req) {
        return await this.statusVendaService.deletar(id, req.user)
    }
}
