import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { StatusCompra } from "src/compras/status_compra/entities/status-compra.entity";
import { Plataforma } from "src/plataformas/entities/plataforma.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compra {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: "datetime" , nullable: false})
    data: Date

    @Column({ type: "datetime", nullable: true })
    data_recebimento: Date

    @ManyToOne(type => Plataforma, plataforma => plataforma.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    plataforma: number

    @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
    valor_frete: number

    @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
    desconto: number

    @IsString()
    @MaxLength(45)
    @Column({ type: "varchar", nullable: true })
    codigo_rastreamento: string

    @IsString()
    @MaxLength(45)
    @Column({ type: "varchar", nullable: true })
    codigo_pedido: string

    @ManyToOne(type => StatusCompra, status_compra => status_compra.id, { nullable: false, eager: true })
    @IsNotEmpty()
    @IsNumber()
    status_compra: number

    @ManyToOne(type => Usuario, usuario => usuario.id, { nullable: false, eager: false })
    @IsNumber()
    usuario: number
}