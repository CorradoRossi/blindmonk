import px from '@lib/utils/to-pixels';
import cn from 'classnames';
import styles from 'styles/loading-dots.module.css';
import { LoadingDotsProps } from '@lib/types';

const LoadingDots = ({ size = 2, height, children, reverse }: LoadingDotsProps) => {
  return (
    <span
      className={cn(styles.loading, { [styles.reverse]: reverse })}
      style={{
        ['--loading-dots-height' as string]: height ? px(height) : undefined,
        ['--loading-dots-size' as string]: size !== 2 ? px(size) : undefined
      }}
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
