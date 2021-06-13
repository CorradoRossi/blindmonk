import cn from 'classnames';
import styleUtils from 'styles/utils.module.css';
import styles from 'styles/hero.module.css';
import { BRAND_NAME, SITE_DESCRIPTION } from '@lib/constants';
import { format } from 'date-fns';

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero)}>
        {BRAND_NAME}
        <br className={styleUtils['show-on-desktop']} />
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
        <p>Coming soon</p>
        <div className={styles['description-separator']} />
        <p>{format(new Date(), 'MMM, dd, yyyy')}</p>
        <div className={styles['description-separator']} />
        <p>
          <strong>A new NFT platform</strong>
        </p>
      </div>
    </div>
  );
};

export default Hero;
