import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from './logger';

/**
 * Reusable API Client wrapper for API testing and data setup
 */
export class ApiClient {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint}`;
    Logger.info(`[API GET] Requesting: ${url}`);
    const response = await this.request.get(url, { headers });
    Logger.info(`[API GET] Status: ${response.status()}`);
    return response;
  }

  async post<T = unknown>(
    endpoint: string,
    data: T,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint}`;
    Logger.info(`[API POST] Requesting: ${url}`);
    const response = await this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    Logger.info(`[API POST] Status: ${response.status()}`);
    return response;
  }
}
