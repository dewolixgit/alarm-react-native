import { AxiosRequestConfig } from 'axios';

export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
}

export type EndpointType = {
  method: HttpMethodEnum;
  url: string;
};

export type ApiRequestConfigType = Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
> & {
  withToken?: boolean;
};

export type ApiErrorType = {
  apiMessage: string | null;
} & { [x: string]: any };

export enum ApiRequestClientEnum {
  noToken = 'noToken',
}

export type ApiResponseType<D = any> =
  | {
      data: null;
      apiError: ApiErrorType;
      clientError: null;
    }
  | {
      data: D;
      apiError: null;
      clientError: null;
    }
  | {
      data: null;
      apiError: null;
      clientError: ApiRequestClientEnum | any;
    };

export const BASE_API_URL = 'http://192.168.1.68:5000/api';

export const ENDPOINTS: Record<string, EndpointType> = {
  login: {
    url: `${BASE_API_URL}/auth/login`,
    method: HttpMethodEnum.POST,
  },

  register: {
    url: `${BASE_API_URL}/auth/register`,
    method: HttpMethodEnum.POST,
  },
};

export const ASYNC_STORAGE_TOKEN_KEY = 'token';
