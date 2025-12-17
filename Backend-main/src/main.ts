import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'; // Added Logger import

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  }
  app.enableCors(options)

  app.use(helmet())

  // Added logging middleware
  app.use((req, res, next) => {
    Logger.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Documentation with Swagger - Elearning Project')
    .setDescription(
      'Swagger (aka OpenApi) is a well-known library in the backend universe, being available for several languages and frameworks. It generates an internal website on your backend that describes, in great detail, each endpoint and entity structure present in your application.',
    )
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Courses')
    .addTag('Lectures')
    .addTag('Assessments')
    .addTag('Works')
    .addTag('Attendance')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(5000)
}
bootstrap()
