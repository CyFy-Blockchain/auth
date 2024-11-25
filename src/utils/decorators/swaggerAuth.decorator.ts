import { strings } from '@app/constants/strings';
import { TokenGuard } from '@app/middleware/guard/token.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

/* A composite decorator function for token protected routes.
 *
 * @param headerDescription - Description for the token header in Swagger.
 * @param unauthorizedDescription - Description for the unauthorized response in Swagger.
 */
export function SwaggerAuth(
  headerDescription = 'Authentication token for the user',
  unauthorizedDescription = strings.INVALID_TOKEN,
) {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: headerDescription,
      required: true,
    }),
    ApiResponse({
      status: 401,
      description: unauthorizedDescription,
    }),
    UseGuards(TokenGuard),
  );
}
