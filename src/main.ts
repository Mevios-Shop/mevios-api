import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: [
      'http://localhost:4200',
      'http://localhost:5030',
      'http://localhost',
      'https://mevios-erp.web.app',
      'https://mevios-erp.firebaseapp.com',
      'https://erp.meviosshop.com.br',
      'https://www.erp.meviosshop.com.br',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ]
  };
  app.enableCors(cors);
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
