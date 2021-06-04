import { useState, useEffect } from 'react';
import styles from './logo.module.css';
import { SITE_NAME_MULTILINE } from '@lib/constants';
import { getLogoImg } from '@lib/cms-providers/dato';

async function doit() {
  const logoImgs = await getLogoImg();
  const logoImg = logoImgs.map((log: any) => {
    return log.logo;
  });
  return logoImg[0];
}

export default function Logo({ textSecondaryColor = 'var(--accents-5)' }) {
  const [logo, setLogo] = useState();

  useEffect(() => {
    doit().then((res: any) => setLogo(res));
  }, []);
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <img src={logo} height="40" />
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
