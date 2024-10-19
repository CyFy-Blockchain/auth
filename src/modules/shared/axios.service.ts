import { envVar } from '@app/config/env/default';
import { ApiEndpoints } from '@app/constants/apiEndpoints';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const { fabric } = envVar;
@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: fabric.gatewayBaseUrl,
      timeout: 5000, // 5 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // GET Request
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST Request
  async post<URL extends keyof ApiEndpoints>(
    url: URL,
    data: ApiEndpoints[URL]['request'], // Infer request body type
    config?: AxiosRequestConfig,
  ): Promise<ApiEndpoints[URL]['response']> {
    // Infer response type
    try {
      const response = await this.axiosInstance.post<
        ApiEndpoints[URL]['response']
      >(url, data, config);
      return response.data as ApiEndpoints[URL]['response'];
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT Request
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE Request
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  private handleError(error: any) {
    if (error.response) {
      console.error(
        `HTTP Error: ${error.response.status} - ${error.response.data}`,
      );
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
