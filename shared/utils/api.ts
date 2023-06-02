import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosHeaders } from 'axios';

import {
  ApiRequestClientEnum,
  ApiRequestConfigType,
  ApiResponseType,
  ASYNC_STORAGE_TOKEN_KEY,
  EndpointType,
} from '../entities/api';

const api = async <D = any>(
  endpoint: EndpointType,
  data: { [x: string]: any } | null = {},
  config: ApiRequestConfigType = {}
): Promise<ApiResponseType<D>> => {
  const {
    withToken = true,
    headers: axiosConfigHeaders,
    ...axiosConfig
  } = config;

  console.log('start api func');
  try {
    const headers = new AxiosHeaders();

    if (withToken) {
      const token = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_KEY);
      console.log('api func: with token', token);

      if (!token) {
        console.log('require token but no token', token);
        return {
          data: null,
          apiError: null,
          clientError: ApiRequestClientEnum.noToken,
        };
      }

      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await axios({
      method: endpoint.method,
      url: endpoint.url,
      data: data,
      headers: {
        ...axiosConfigHeaders,
        ...headers.toJSON(),
      },
      ...axiosConfig,
    });

    console.log(response);

    return {
      data: response.data,
      apiError: null,
      clientError: null,
    };
  } catch (exception: AxiosError | any) {
    console.log(exception);
    if (exception instanceof AxiosError) {
      return {
        data: null,
        apiError: {
          apiMessage: exception.response?.data.message ?? null,
        },
        clientError: null,
      };
    }

    return {
      data: null,
      apiError: null,
      clientError: exception,
    };
  }
};

export default api;
