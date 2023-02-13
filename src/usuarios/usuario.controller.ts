import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { InserirUsuarioDto } from './dto/inserir-usuario.dto';
import { UsuarioService } from './usuario.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Param, Patch, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async inserir(@Body() inserirUsuarioDto: InserirUsuarioDto) {
        return await this.usuarioService.inserir(inserirUsuarioDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async atualizar(@Param('id') id: string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
        return await this.usuarioService.atualizar(+id, atualizarUsuarioDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deletar(@Param('id') id: string) {
        return await this.usuarioService.deletar(+id)
    }
}
