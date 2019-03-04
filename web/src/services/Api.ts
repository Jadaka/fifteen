import axios, { AxiosRequestConfig } from 'axios';

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
  private basePath: string = '/';
  private auth = new Auth();
  private defaultRequestConfig = {
    method: 'get',
  };

  public setOptions({ basePath }: ApiOptions) {
    this.basePath = basePath;
  }

  public request(
    method: string, url: string, requestConfig: AxiosRequestConfig = {}) {

    const config = Object.assign({}, this.defaultRequestConfig, requestConfig, {
      method, url: this.basePath + url,
    });

    return axios.request(config);
  }
}

export default Api;
