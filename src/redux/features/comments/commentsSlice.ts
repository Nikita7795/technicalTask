import { RequestStatusEnum } from 'src/redux/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadComments, loadMoreComments } from './commentsActions';

export interface IComments {
  id: number,
  created: string,
  text: string,
  author: number,
  parent: number,
  likes: number,
}

export interface IPaginationComment {
  page: number,
  size: number,
  total_pages: number,
}

export interface ICommentsTree extends IComments {
  children?: IComments[]
}

export interface ICommentsState {
  comments: ICommentsTree[];
  pagination: IPaginationComment | null;
  totalLikes: number,
  totalComments: number,
  status: RequestStatusEnum;
  statusMoreLoad: RequestStatusEnum;
  error: null | string;
}

const initialState: ICommentsState = {
  comments: [],
  pagination: null,
  totalLikes: 0,
  totalComments: 0,
  status: RequestStatusEnum.IDLE,
  statusMoreLoad: RequestStatusEnum.IDLE,
  error: null,
};
const calculateValuesTree = (items: ICommentsTree[]) => {
  let totalLikes = 0
  let totalComments = 0

  const buildTree = (parentId: number | null = null) => {
    const treeData: ICommentsTree[] = [];

    items.forEach((item) => {
      if (item.parent === parentId) {
        const children = buildTree(item.id);
        totalLikes += item.likes;
        totalComments += 1;
        if (children.length > 0) {
          item.children = children;
        }
        treeData.push(item);
      }
    });

    return treeData;
  }
  const tree: ICommentsTree[] = buildTree(null);

  return { tree, totalLikes, totalComments };
}

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    changeTotalLikes: (state, action: PayloadAction<number>) => {
      state.totalLikes += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
        const { tree, totalLikes, totalComments } = calculateValuesTree(action.payload.data)
        state.comments = tree
        state.totalLikes = totalLikes
        state.totalComments = totalComments
        state.pagination = action.payload.pagination
        state.status = RequestStatusEnum.FULFILLED;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.status = RequestStatusEnum.REJECTED;
        state.error = action.error as string;
      })
      .addCase(loadComments.pending, (state) => {
        state.status = RequestStatusEnum.PENDING;
      })
      .addCase(loadMoreComments.fulfilled, (state, action) => {
        const { tree, totalLikes, totalComments } = calculateValuesTree(action.payload.data)
        state.comments = [...state.comments, ...tree]
        state.pagination = action.payload.pagination;
        state.totalLikes += totalLikes
        state.totalComments += totalComments
        state.statusMoreLoad = RequestStatusEnum.FULFILLED;
      })
      .addCase(loadMoreComments.rejected, (state, action) => {
        state.statusMoreLoad = RequestStatusEnum.REJECTED;
      })
      .addCase(loadMoreComments.pending, (state) => {
        state.statusMoreLoad = RequestStatusEnum.PENDING;
      });
  },
});

export const commentsSliceActions = commentsSlice.actions

export default commentsSlice.reducer;
