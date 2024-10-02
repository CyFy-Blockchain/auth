import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerHealthCheckService {
  /**
   * Retrieves a greeting message.
   *
   * @returns A string containing the greeting message "Hello World!".
   */
  getHello(): string {
    return 'Hello World!';
  }
}
