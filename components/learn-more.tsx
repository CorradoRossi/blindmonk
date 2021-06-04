import cn from 'classnames';
import styleUtils from 'styles/utils.module.css';
import styles from 'styles/contact.module.css';
import { REPO } from '@lib/constants';

export default function LearnMore() {
  return (
    <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.contact)}>
      Learn more on{' '}
      <a href={REPO} className={styles['contact-email']} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      .
    </div>
  );
}
