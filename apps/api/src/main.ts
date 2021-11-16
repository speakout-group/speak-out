import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedisIoAdapter } from './core/adapter/redis-io.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { environment, environments } from './environments/environments';
import { CustomSocketIoAdapter } from './core/adapter/custom-socket-io.adapter';

const redis = environments.redis;

const setupSwagger = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Speak Out')
    .setDescription('The SpeakOut API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        in: 'Header',
      },
      'access-token'
    )
    .addTag('speakout')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (environment === 'development') {
    setupSwagger(app);
  }

  app.enableCors();
  app.enableShutdownHooks();
  app.set('trust proxy', environments.proxyEnabled);

  if (redis.enabled) {
    app.useWebSocketAdapter(new RedisIoAdapter(redis.host, redis.port, app));
  } else {
    app.useWebSocketAdapter(new CustomSocketIoAdapter(app));
  }

  const port = environments.port;
  const logger = new Logger('SpeakOut');

  await app.listen(port, () => logger.log(`Server listening on port ${port}`));
}

bootstrap();
