import { commentsTotalLikeSelector, totalCommentsSelector } from "src/redux/features/comments/commentsSelectors";
import { useAppSelector } from "src/redux/store";
import './CommentTitle.css';
import { ReactComponent as LikeGrey } from "../../assets/likes/likeGreySvg.svg";
import { getCommentsLabel } from "src/utils/function";

const CommentTitle: React.FC = (
) => {
  const totalLike = useAppSelector(commentsTotalLikeSelector);
  const totalComment = useAppSelector(totalCommentsSelector);
  return (
    <div className={'CommentTitle'}>
      <header className={'CommentTitle-content'}>
        <p className={'CommentTitle-text'}>{`${totalComment} ${getCommentsLabel(totalComment)}`}</p>
        <div className={'CommentTitle-likes'}>
          <LikeGrey />
          <p className={'CommentTitle-text'}>{`${totalLike}`}</p>
        </div>
      </header>
    </div>
  )
};

export default CommentTitle;
