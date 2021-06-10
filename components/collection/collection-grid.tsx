import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/collection-grid.module.css';
import { useWeb3React } from '@web3-react/core';
import { OPENSEA_BASE_URL, OPENSEA_ASSETS } from '@lib/constants';
//import { RSSI_WALLET } from '@lib/constants';

type DataObject = {
  assets: [];
};

const CollectionGrid = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataObject>({ assets: [] });
  const { account } = useWeb3React();

  useEffect(() => {
    async function fetchData() {
      const url = `${
        OPENSEA_BASE_URL + OPENSEA_ASSETS
      }?owner=${account}&order_direction=desc&offset=0&limit=100`;
      const options = { method: 'GET' };
      setIsLoading(true);
      const fetcher = await window.fetch(url, options);
      const response = await fetcher.json();
      setData(response);
      console.log(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <div className={styles.grid}>
      {data?.assets?.length < 1 ? (
        <>
          <h2 className={styles.name}>There are no NFT's in your collection!</h2>
        </>
      ) : (
        data?.assets?.map((asset: any) => (
          <Link key={asset?.permalink} href={`/collection/${asset?.id}`}>
            <a role="button" tabIndex={0} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  alt={asset?.name}
                  src={asset?.image_preview_url}
                  className={styles.image}
                  loading="lazy"
                  quality="50"
                  title={asset?.name}
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.cardBody}>
                <div>
                  <div className={styles.nameWrapper}>
                    <h2 className={styles.name}>{asset?.name}</h2>
                  </div>
                  <p className={styles.title}>
                    {`@${asset?.creator?.user?.username}`}
                    <span className={styles.company}>{''}</span>
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))
      )}
    </div>
  );
};

export default CollectionGrid;
