import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig } from '@config/swagger/swagger.config';
import { dataSource } from '@config/datasource';

import { AppModule } from '@app/app.module';

/**
 * Initializes the Nest application and sets up the global prefix for all routes.
 * It also sets up the Swagger UI for API documentation.
 *
 * @returns A Promise that resolves when the application is fully initialized and listening on the specified port.
 */
export async function initializeApp(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // setting up swagger UI
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  // initializing db
  await dataSource.initialize();
  console.info(`Data source has been initialized`);

  await app.listen(process.env.PORT || 3000, () => {
    console.info(`Server running on Port: ${process.env.PORT}`);
  });
}
