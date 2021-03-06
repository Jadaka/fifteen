import Api from './Api';

import axios from '../../__mocks__/axios';

jest.mock('axios');
jest.mock('./Auth');

let api: Api;

describe('Api class', () => {
  beforeEach(() => {
    api = new Api();
  });

  test('should be able to set a base path', () => {
    api.setOptions({
      basePath: '/api',
    });
    api.request('get', '/hello');

    const requests = axios.request.mock.calls;
    const targetRequestConfig = requests[requests.length - 1][0];
    expect(targetRequestConfig.url).toBe('/api/hello');
  });

  test('should be able to send a request with options', () => {
    const headers = { 'content-type': 'application/json' };
    const postData = { key: 'value' };
    const queryParams = { query: 'search-string' };

    api.request('post', '/hello', {
      headers,
      data: postData,
      params: queryParams,
    });

    const requests = axios.request.mock.calls;
    const targetRequestConfig = requests[requests.length - 1][0];
    expect(targetRequestConfig.headers).toEqual(headers);
    expect(targetRequestConfig.data).toEqual(postData);
    expect(targetRequestConfig.params).toEqual(queryParams);
  });

  test('should be able to send a request with auth headers', () => {
    const headers = { 'content-type': 'application/json' };

    api.requestWithAuth('post', '/hello', { headers });
    const requests = axios.request.mock.calls;
    const targetRequestConfig = requests[requests.length - 1][0];
    expect(targetRequestConfig.headers.Authorization)
      .toBe('Bearer mock-access-token');
  });
});
