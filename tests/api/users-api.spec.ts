import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/utils/api-client';
import { Environment } from '../../src/config/environment';

test.describe('REST API Test Suite (reqres.in)', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request, Environment.apiBaseUrl);
  });

  test('TC-API-01: GET /api/users?page=2 - Should return paginated users with HTTP 200', async () => {
    const response = await apiClient.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('email');
  });

  test('TC-API-02: POST /api/users - Should create a user with HTTP 201', async () => {
    const payload = {
      name: 'Harshit',
      job: 'Lead Quality Architect',
    };

    const response = await apiClient.post('/api/users', payload);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});
