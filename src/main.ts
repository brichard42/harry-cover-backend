import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptors';
import { GlobalExceptionFilter } from './filters/errors.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: [ 'http://localhost:3000', 'https://harry-cover-frontend.vercel.app/'],
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
