import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

const selectSelf = (state: RootState) => state.authorsSlice;

export const authorsSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.authors,
);

export const authorsStatusSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.status,
);
