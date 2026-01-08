import {IsString, MinLength} from 'class-validator'

export class CreateCarDto{
    @IsString({message:`The Brand most be a cool string`})
    readonly brand: string
    @IsString()
    @MinLength(3) //Sirve para indicar la cantidad de caracteres que espera recibir la llave model
    readonly model: string
}