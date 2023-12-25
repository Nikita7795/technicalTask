import { createAsyncThunk } from '@reduxjs/toolkit';
import getAuthorsRequest from 'src/api/authors/getAuthorsRequest';
import { IAuthors } from './authorsSlice';
import { AxiosError } from 'axios';

export const loadAuthors = createAsyncThunk<
  IAuthors[],
  void,
  {
    rejectValue: AxiosError;
  }
>('loadAuthors', async (_, { rejectWithValue }) => {
  try {
    const data = await getAuthorsRequest();
    return data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});