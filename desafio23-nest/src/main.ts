import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Products Example')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const docuement = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, docuement);

  await app.listen(3000);
}
bootstrap();
