import styles from './CommentCard.css';
import cn from 'classnames/bind';
import { ReactComponent as Like } from '../../assets/likes/likeSvg.svg';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { authorsSelector } from 'src/redux/features/authors/authorsSelectors';
import { ICommentsTree, commentsSliceActions } from 'src/redux/features/comments/commentsSlice';
import { intlFormatHourDate } from 'src/utils/function';
import { useState } from 'react';

const cx = cn.bind(styles);

export interface ICommentCard {
  comment: ICommentsTree;
  isDepth: boolean;
}

const CommentCard: React.FC<ICommentCard> = ({ comment, isDepth }) => {
  const dispatch = useAppDispatch();

  const autors = useAppSelector(authorsSelector);

  const [isLike, setIsLike] = useState(false)

  const handleLike = () => {
    setIsLike((prev) => !prev)
    dispatch(commentsSliceActions.changeTotalLikes(!isLike ? 1 : -1))
  }

  return (
    <div className={cx('CommentCard', { 'CommentCardDepth': isDepth })}>
      <header className={'CommentCard-header'}>
        <div className={'CommentCard-avatarContainer'}>
          <img
            className={'CommentCard-avatar'}
            src={autors?.[comment.author]?.avatar}
            alt="avatar"
          />
          <div className={'CommentCard-containerAuthor'}>
            <p className={'CommentCard-textDef'}>
              {autors?.[comment.author]?.name || ''}
            </p>
            <span className={'CommentCard-textDate'}>{intlFormatHourDate(comment.created)}</span>
          </div>
        </div>
        <div className={'CommentCard-likes'}>
          <Like onClick={handleLike} className={cx('CommentCard-like', { 'CommentCard-likeActive': isLike })} />
          <p className={'CommentCard-textDef'}>{isLike ? comment.likes + 1 : comment.likes}</p>
        </div>
      </header>
      <p className={'CommentCard-textMessage'}>{comment.text}</p>
    </div>
  );
};

export default CommentCard;
