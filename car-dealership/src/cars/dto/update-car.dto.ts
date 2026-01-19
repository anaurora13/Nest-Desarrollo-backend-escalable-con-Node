import {IsOptional, IsString, IsUUID, MinLength} from 'class-validator'

export class UpdateCarDto{
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string

    @IsString({message:`The Brand most be a cool string`})
    @IsOptional()
    readonly brand?: string
    
    @IsString()
    @IsOptional()
    @MinLength(3) //Sirve para indicar la cantidad de caracteres que espera recibir la llave model
    readonly model?: string
}