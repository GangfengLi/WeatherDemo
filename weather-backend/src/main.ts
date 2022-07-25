import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const originHosts = ['http://localhost:3000'];
  app.enableCors({
    origin: originHosts,
    credentials: true,
  });
  const config = app.get(ConfigService);
  await app.listen(config.get('port'));
}
bootstrap();
