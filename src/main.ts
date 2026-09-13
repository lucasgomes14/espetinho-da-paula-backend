import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    app.listen(3000, () => {
      console.log('Servidor rodando localmente na porta 3000');
    });
  });
}

export default async function (req: any, res: any) {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
