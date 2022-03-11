import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Attach endpoint documentation
  const documentConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation for backend API endpoints')
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Get config service
  const configService = app.get(ConfigService);

  // Begin server
  const port = configService.get<number>('PORT') ?? 4200;
  await app.listen(port);
}
bootstrap();
