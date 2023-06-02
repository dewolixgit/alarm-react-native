import AsyncStorage from '@react-native-async-storage/async-storage';
import { computed, makeObservable } from 'mobx';
import { ToastAndroid } from 'react-native';

import {
  ASYNC_STORAGE_TOKEN_KEY,
  ENDPOINTS,
} from '../../../shared/entities/api';
import { AuthFieldsType } from '../../../shared/entities/auth';
import { ValueModel } from '../../../shared/models/ValueModel';
import api from '../../../shared/utils/api';

class UserStore {
  readonly token = new ValueModel<string | null>(null);

  readonly authLoading = new ValueModel(false);

  constructor() {
    makeObservable(this, {
      isAuthorized: computed,
    });
  }

  get isAuthorized(): boolean {
    return Boolean(this.token.value);
  }

  init = async (): Promise<void> => {
    const tokenValue = await AsyncStorage.getItem('token');

    if (tokenValue) {
      this.token.setValue(tokenValue);
    }
  };

  login = async ({
    email,
    password,
  }: AuthFieldsType): Promise<boolean | null> => {
    if (this.authLoading.value) {
      return null;
    }

    this.authLoading.setValue(true);

    const response = await api<{ token: string }>(
      ENDPOINTS.login,
      {
        email,
        password,
      },
      {
        withToken: false,
      }
    );

    if (response.clientError) {
      this.authLoading.setValue(false);
      ToastAndroid.show('Login error', ToastAndroid.SHORT);
      return false;
    }

    if (response.apiError) {
      this.authLoading.setValue(false);
      ToastAndroid.show(
        response.apiError.apiMessage ?? 'Login error',
        ToastAndroid.SHORT
      );
      return false;
    }

    if (response.data?.token) {
      await AsyncStorage.setItem(ASYNC_STORAGE_TOKEN_KEY, response.data.token);
      this.token.setValue(response.data.token);
      this.authLoading.setValue(false);
      return true;
    }

    this.authLoading.setValue(false);
    return false;
  };

  register = async ({
    email,
    password,
  }: AuthFieldsType): Promise<boolean | null> => {
    if (this.authLoading.value) {
      return null;
    }

    this.authLoading.setValue(true);

    const response = await api<{ token: string }>(
      ENDPOINTS.register,
      {
        email,
        password,
      },
      {
        withToken: false,
      }
    );

    if (response.clientError) {
      this.authLoading.setValue(false);
      ToastAndroid.show('Register error', ToastAndroid.SHORT);
      return false;
    }

    if (response.apiError) {
      this.authLoading.setValue(false);
      ToastAndroid.show(
        response.apiError.apiMessage ?? 'Register error',
        ToastAndroid.SHORT
      );
      return false;
    }

    if (response.data) {
      this.authLoading.setValue(false);
      ToastAndroid.show('You are registered', ToastAndroid.SHORT);
      return true;
    }

    this.authLoading.setValue(false);
    return false;
  };

  logout = async (): Promise<void> => {
    this.token.setValue(null);
    await AsyncStorage.removeItem(ASYNC_STORAGE_TOKEN_KEY);
  };
}

export const userStore = new UserStore();
