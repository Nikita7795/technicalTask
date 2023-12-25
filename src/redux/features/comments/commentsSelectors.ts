import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

const selectSelf = (state: RootState) => state.commentsSlice;

export const commentsSelector = createDraftSafeSelector(
  selectSelf,
  (state) => ({ comments: state.comments, pagination: state.pagination }),
);

export const commentsTotalLikeSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.totalLikes,
);

export const totalCommentsSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.totalComments,
);

export const commentsStatusSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.status,
);

export const commentsMoreStatusSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.statusMoreLoad,
);
