import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
// import { websocket } from './common/websocket';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'debug', 'warn', 'verbose'],
  });
  const origins = [`http://localhost:5173`];
  app.enableCors({
    // origin: origins,
    origin: origins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }); // 详细见https://github.com/expressjs/cors#configuring-cors-asynchronously
  // 后面需要修改写法方便扩展,而且还有很多不清楚
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();
