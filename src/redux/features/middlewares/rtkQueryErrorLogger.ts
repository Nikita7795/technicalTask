import { isRejectedWithValue, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
 
  if (isRejectedWithValue(action)) {
    const error = (action as PayloadAction<AxiosError>).payload
    toast.error(
      error?.message && typeof error.message === 'string'
        ? `${error.message}`
        : 'Ошибка!',
    );
  }

  return next(action);
};
