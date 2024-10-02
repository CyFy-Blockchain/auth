import { DocumentBuilder } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';

/**
 * Configures the Swagger documentation for the Fabric Gateway.
 * @returns The configured Swagger documentation.
 */
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fabric Gateway - CyFy Documentation')
  .setDescription('This documentation is for Fabric Gateway documentation')
  .setVersion('1.0.0')
  .addServer('http://localhost:3000', 'Local environment')
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' },
    'api-gateway-key',
  )
  .addTag(SWAGGER_TAGS.HEALTH_CHECK)
  .addTag(SWAGGER_TAGS.AUTH)
  .build();
