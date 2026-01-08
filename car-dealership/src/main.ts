import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  //Nos permite validar el resource enviado por el cliente.
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, //Si el resource trae llaves no reconocidas se removeran en la validacion. Es decir se limpia por posible data basura.
        forbidNonWhitelisted: true, //Sirve para indicar si la llave enviada no esta permitida.
    }),
  )
  await app.listen(process.env.PORT ?? 3000);
}
main();
