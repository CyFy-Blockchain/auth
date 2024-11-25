import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;

    // Capture the original send method to log the response payload
    const originalSend = response.send;
    let responseBody: any;

    // Override the response.send method
    response.send = function (body: any): Response {
      responseBody = body; // Capture the response body
      return originalSend.call(this, body);
    };

    response.on('finish', () => {
      const authUser = request['user'];
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const logData = {
        method,
        callerId: authUser ? authUser.id : null,
        url: originalUrl,
        statusCode,
        contentLength,
        ip,
        userAgent,
        requestBody: body,
        responseBody,
      };

      this.logger.log(JSON.stringify(logData, null, 2));
    });

    next();
  }
}
