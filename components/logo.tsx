import styles from './logo.module.css';
import { SITE_NAME_MULTILINE } from '@lib/constants';
import { getLogoImg } from '@lib/cms-providers/dato';

export default async function Logo({ textSecondaryColor = 'var(--accents-5)' }) {
  const logoImgs = await getLogoImg();
  const logoImg = logoImgs[0];
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <img src={logoImg.logo} height="40" />
      </div>
      <div className={styles.text}>
        <div>{SITE_NAME_MULTILINE[0]}</div>
        <div
          style={{ ['--color' as string]: textSecondaryColor }}
          className={styles['text-secondary']}
        >
          {SITE_NAME_MULTILINE[1]}
        </div>
      </div>
    </div>
  );
}
