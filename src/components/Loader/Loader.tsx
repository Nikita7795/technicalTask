
import styles from './Loader.css';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

export interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = (
  { className }) => {
  return (
    <div className={cx('Loader', className)}>
      <div className={'Loader-content'}></div>
    </div>
  )
};

export default Loader;
