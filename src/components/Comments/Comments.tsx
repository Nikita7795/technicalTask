import React from 'react';
import styles from './Comments.css';
import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { authorsStatusSelector } from 'src/redux/features/authors/authorsSelectors';
import { useEffect, useMemo } from 'react';
import { loadAuthors } from 'src/redux/features/authors/authorsActions';
import { loadComments, loadMoreComments } from 'src/redux/features/comments/commentsActions';
import {
  commentsMoreStatusSelector,
  commentsSelector,
  commentsStatusSelector,
} from 'src/redux/features/comments/commentsSelectors';
import { RequestStatusEnum } from 'src/redux/constants';
import Loader from '../Loader/Loader';
import CommentTitle from '../CommentTitle/CommentTitle';
import CommentCard from '../CommentCard/CommentCard';
import { ICommentsTree } from 'src/redux/features/comments/commentsSlice';

const cx = cn.bind(styles);

const FIRST_PAGE = 1;

const Comments: React.FC = () => {
  const dispatch = useAppDispatch();

  const statusComment = useAppSelector(commentsStatusSelector);
  const statusMoreComment = useAppSelector(commentsMoreStatusSelector);
  const statusAuthors = useAppSelector(authorsStatusSelector);
  const { comments, pagination } = useAppSelector(commentsSelector);

  useEffect(() => {
    dispatch(loadAuthors());
    dispatch(loadComments(FIRST_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComments = useMemo(() => {
    const treeRender = (dataComments: ICommentsTree[], isDepth: boolean) =>
      dataComments.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentCard comment={comment} isDepth={isDepth} />
          {comment?.children &&
            comment?.children?.length > 0 &&
            treeRender(comment.children, true)}
        </React.Fragment>
      ));
    return treeRender(comments, false);
  }, [comments]);



  const loadMore = () => {
    (!!pagination && statusMoreComment !== RequestStatusEnum.PENDING) && dispatch(loadMoreComments(pagination?.page + 1))
  }

  if (
    statusComment === RequestStatusEnum.PENDING ||
    statusAuthors === RequestStatusEnum.PENDING
  )
    return <Loader className="loader" />;

  else if (
    statusComment === RequestStatusEnum.REJECTED ||
    statusAuthors === RequestStatusEnum.REJECTED
  )
    return (
      <div className="textRejectContainer">
        <p className="textReject">Не удалось загрузить данные</p>
      </div>
    );

  return (
    <div className={'Comments'}>
      <CommentTitle />
      <div className={'Comments-cards'}>{renderComments}</div>
      <button onClick={loadMore} disabled={(!!pagination && pagination.page >= pagination.total_pages)} className={cx('Comments-button', { 'Comments-buttonPending': statusMoreComment === RequestStatusEnum.PENDING })} type="button">{'Загрузить еще'}</button>
    </div>
  );
};

export default Comments;