import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static files from the 'uploads' directory
  app.use('/uploads', express.static('uploads'));
  app.enableCors();;
  await app.listen(parseInt(process.env.PORT) || 3000, () => {
    console.log(`App Running on port ${process.env.PORT}`);
  });
}
bootstrap();
