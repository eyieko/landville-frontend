import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as domino from 'domino';

async function bootstrap() {

  // create a mock body that will have a mock document
  const template = `<body></body>`;

  // Shim for the global window and document objects.
  const window = domino.createWindow(template);
  global['window'] = window;
  global['document'] = window.document;



  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');
  await app.listen(4200);
}
bootstrap();
