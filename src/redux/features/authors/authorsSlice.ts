import { RequestStatusEnum } from 'src/redux/constants';
import { createSlice } from '@reduxjs/toolkit';
import { loadAuthors } from './authorsActions';

export interface IAuthors {
  id: number,
  name: string,
  avatar: string,
}

export interface IObjAuthors {
  [key: number]: IAuthors
}

export interface IAuthorsState {
  authors: IObjAuthors;
  status: RequestStatusEnum;
  error: null | string;
}

const initialState: IAuthorsState = {
  status: RequestStatusEnum.IDLE,
  authors: {},
  error: null,
};

export const authorsSlice = createSlice({
  name: 'authorsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthors.fulfilled, (state, action) => {
        state.authors = action.payload.reduce(
          (acc, item) => ({ ...acc, [item.id]: item }),
          {} as IObjAuthors,
        );
        state.status = RequestStatusEnum.FULFILLED;
      })
      .addCase(loadAuthors.rejected, (state, action) => {
        state.status = RequestStatusEnum.REJECTED;
        state.error = action.error?.message || 'Ошибка';
      })
      .addCase(loadAuthors.pending, (state) => {
        state.status = RequestStatusEnum.PENDING;
      })
  },
});

export default authorsSlice.reducer;
