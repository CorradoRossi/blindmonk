import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SpeakersGridProps } from '@lib/types';
import styles from 'styles/speakers-grid.module.css';

const AssetGrid = ({ speakers, assets, account }: SpeakersGridProps) => {
  const [localAssets, setLocalAssets] = useState([]);

  useEffect(() => {
    if (typeof assets === 'object') {
      console.log(assets, 'inside');
      setLocalAssets(assets);
    }
    console.log(assets, 'outside');
  }, []);

  useEffect(() => {
    if (typeof assets === 'object') {
      console.log(assets, 'inside');
      setLocalAssets(assets);
    }
    console.log(assets, 'outside');
  }, [assets]);

  return (
    <div className={styles.grid}>
      {localAssets.map((asset: any) => (
        <Link key={asset.name} href={`/speakers/${asset.permalink}`}>
          <a role="button" tabIndex={0} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                alt={asset.name}
                src={asset.image_preview_url}
                className={styles.image}
                loading="lazy"
                quality="50"
                title={asset.name}
                width={300}
                height={300}
              />
            </div>
            <div className={styles.cardBody}>
              <div>
                <h2 className={styles.name}>{asset.name}</h2>
                <p className={styles.title}>
                  {`${asset.creator.user.username} @ `}
                  <span className={styles.company}>{asset.last_sale.payment_token.eth_price}</span>
                </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AssetGrid;
