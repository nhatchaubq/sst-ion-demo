import type { ApiResponse } from '../types';

export const success = <T>(
  value: string | T = 'OK',
  additionalData?: object
): ApiResponse<T> => {
  return {
    isError: false,
    ...(!!additionalData && additionalData),
    ...(typeof value === 'string' ? { message: value } : { data: value }),
  };
};

export const error = (message: string): ApiResponse<never> => {
  return {
    isError: true,
    message,
  };
};
