/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AtualizarPlataformaDto } from './dto/atualizar-plataforma.dto';
import { InserirPlataformaDto } from './dto/inserir-plataforma.dto';
import { Plataforma } from './entities/plataforma.entity';
import { PlataformasService } from './plataformas.service';

@Controller("plataformas")
export class PlataformasController { 

    constructor(private plataformasService: PlataformasService) { }

    @Post()
    inserir(@Body() inserirPlataformaDto: InserirPlataformaDto) {
        return this.plataformasService.inserir(inserirPlataformaDto)
    }

    @Get()
    buscarPlataformas(): Promise<Plataforma[]> {
        return this.plataformasService.buscarTodos()
    }

    @Get(':id')
    buscarPlataforma(@Param() params): Promise<Plataforma> {
        return this.plataformasService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarPlataformaDto: AtualizarPlataformaDto) {
        return this.plataformasService.atualizar(+id, atualizarPlataformaDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.plataformasService.deletar(+id)
    }
}
