/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AtualizarPlataformaDto } from './dto/atualizar-plataforma.dto';
import { InserirPlataformaDto } from './dto/inserir-plataforma.dto';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformasService } from './plataformas.service';

@Controller("plataformas")
export class PlataformasController { 

    constructor(private plataformasService: PlataformasService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async inserir(@Body() inserirPlataformaDto: InserirPlataformaDto, @Request() req) {
        return await this.plataformasService.inserir(inserirPlataformaDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async buscarPlataformas(@Request() req): Promise<Plataforma[]> {
        return await this.plataformasService.buscarTodos(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarPlataforma(@Param() params, @Request() req): Promise<Plataforma> {
        return await this.plataformasService.buscarPorId(params.id, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarPlataformaDto: AtualizarPlataformaDto, @Request() req) {
        return await this.plataformasService.atualizar(+id, atualizarPlataformaDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: string, @Request() req) {
        return await this.plataformasService.deletar(+id, req.user)
    }
}
