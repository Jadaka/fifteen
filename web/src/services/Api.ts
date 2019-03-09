import axios, { AxiosRequestConfig } from 'axios';

import { getService, ServiceName } from './globals';
import Auth from './Auth';

export interface ApiOptions {
  basePath: string
}

/**
 * Api
 *
 * A wrapper class for calls to fifteen-api.
 */
class Api {
  private basePath: string = '/api';
  private auth: Auth = getService(ServiceName.AUTH) as Auth;
  private defaultRequestConfig = {
    method: 'get',
  };

  public setOptions({ basePath }: ApiOptions) {
    this.basePath = basePath;
  }

  public requestWithAuth(
    method: string, url: string, requestConfig: AxiosRequestConfig = {}) {
    requestConfig.headers =
      {...this.getAuthHeaders(), ...requestConfig.headers};
    return this.request(method, url, requestConfig);
  }

  public request(
    method: string, url: string, requestConfig: AxiosRequestConfig = {}) {
    const config = {
      ...this.defaultRequestConfig,
      ...requestConfig,
      method,
      url: this.basePath + url,
    };
    return axios.request(config);
  }

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    };
  }
}

export default Api;
