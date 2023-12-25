import { createAsyncThunk } from '@reduxjs/toolkit';
import getCommentsRequest from 'src/api/comments/getCommentsRequest';
import { IComments, IPaginationComment } from './commentsSlice';
import { AxiosError } from 'axios';

export interface ILoadComments {
  pagination: IPaginationComment,
  data: IComments[]
}

export const loadComments = createAsyncThunk<ILoadComments, number, { rejectValue: AxiosError }>(
  'loadComments',
  async (
    params,
    { rejectWithValue },
  ) => {
    try {
      const data = await getCommentsRequest(params);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const loadMoreComments = createAsyncThunk<ILoadComments, number, { rejectValue: AxiosError }>(
  'loadMoreComments',
  async (
    params: number,
    { rejectWithValue },
  ) => {
    try {
      const data = await getCommentsRequest(params);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);
