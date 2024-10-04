import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Configures the Swagger documentation for the Fabric Gateway.
 * @returns The configured Swagger documentation.
 */
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fabric Gateway - CyFy Documentation')
  .setDescription('This documentation is for Fabric Gateway documentation')
  .setVersion('1.0.0')
  .addServer('http://localhost:4000', 'Local environment')
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' },
    'api-gateway-key',
  )
  .build();
