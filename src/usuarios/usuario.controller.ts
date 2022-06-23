import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InserirUsuarioDto } from './dto/inserir-usuario.dto';
import { UsuarioService } from './usuario.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Param, Get, Patch, Delete, HttpCode } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {
        
    }

    @Post()
    inserir(@Body() inserirUsuarioDto: InserirUsuarioDto) {
        return this.usuarioService.inserir(inserirUsuarioDto)
    }

    @Get(':id')
    buscarProduto(@Param() params): Promise<Usuario> {
        return this.usuarioService.buscarPorId(params.id)
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
        return this.usuarioService.atualizar(+id, atualizarUsuarioDto)
    }

    @Delete(':id')
    @HttpCode(204)
    deletar(@Param('id') id: string) {
        return this.usuarioService.deletar(+id)
    }
}
