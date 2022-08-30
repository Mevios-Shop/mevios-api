import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InserirUsuarioDto } from './dto/inserir-usuario.dto';
import { UsuarioService } from './usuario.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Body, Param, Get, Patch, Delete, HttpCode, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async inserir(@Body() inserirUsuarioDto: InserirUsuarioDto) {
        return await this.usuarioService.inserir(inserirUsuarioDto)
    }

    /*
    @Get(':id')
    buscarPorId(@Param() params): Promise<Usuario> {
        return this.usuarioService.buscarPorId(params.id)
    }*/

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

    /*
    @Post('authenticate')
    async login(@Body() authenticateDto: AuthenticateDto) {

        const usuario = await this.authService.validateUser(authenticateDto.email, authenticateDto.senha);
        
        if (!usuario) {
            throw new HttpException('Usuário ou senha inválido', HttpStatus.UNAUTHORIZED)
        }

        const token = await this.authService.login(usuario)
        return token
    }*/
}
