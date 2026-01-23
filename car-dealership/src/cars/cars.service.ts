import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        /* {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        } */
    ]

    findAll(){
        return this.cars
    }

    findOneById(id:string){
        const car = this.cars.find(car=>car.id === id)
        if (!car) throw new NotFoundException(`Carro con id ${id} no existe`)
        return car
    }

    create(createCarDto: CreateCarDto){
        const car: Car = {
            id: uuid(),
            //brand: CreateCarDto.brand,
            //model: CreateCarDto.model,
            ...createCarDto //Traer todas las propiedades de la clase
        }

        this.cars.push(car);
        return car;
    }

    update (id:string, updateCarDto: UpdateCarDto){
        let carDB = this.findOneById(id);

        //Pero si se quiere validar que el id enviado en el patch sea igual en caso de que se envie dentro de la data como otro parametro se puede realizar la siguiente validacion.
        if(updateCarDto.id && updateCarDto.id !== id){
            throw new BadRequestException('Car id is not valid inside body')
        }

        this.cars = this.cars.map(
            car => {
                if (car.id === id) {
                    carDB =  {
                        ...carDB, //Se esparse todas las propiedades que tenga el carDB
                        ...updateCarDto, //Esparso todas las propiedades que vienen para actualizar lo cual va a sobreescribir a carDB
                        id //Si en updateCarDto viniera un id, este id sobreescribe la propiedad. Con esto ya no es necesario realizar una validacion del id.↑
                    }
                    return carDB
                }
                return car
            }
        )
        return carDB
    }

    delete(id: string){
        const car = this.findOneById(id)
        this.cars = this.cars.filter(
            car => car.id !== id
        )
    }

    fillCarsWithSeedData(cars: Car[]){
        this.cars = cars
    }
}
