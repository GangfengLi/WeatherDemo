import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      proxy: {
        host: 'localhost',
        port: 7890,
        protocol: 'http',
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
