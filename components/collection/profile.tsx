import { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/collection-section.module.css';
import GithubIcon from '@components/icons/icon-github';
import TwitterIcon from '@components/icons/icon-twitterr';

const CollectionItem = ({ account, data, assets }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataArray, setDataArray] = useState<any>({
    assets: [
      {
        name: 'Victor Apesalot',
        image: { url: 'https://www.datocms-assets.com/49202/1623328125-boredape.png' },
        title: 'CEO',
        company: 'Hundred Monkey Club llc',
        bio:
          'Just a small town ape living in a big ape city. Come by and we can discuss NFTs over a banana!',
        twitter: 'https://twitter.com/metastash',
        github: 'https://github.com/CorradoRossi/',
        talk: { title: 'Motivational Speaker', description: 'Ape in a place doing a thing.' }
      }
    ]
  });

  useEffect(() => {
    let localAssets = assets.assets;
    if (localAssets.length > 0) {
      setDataArray(localAssets);
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div></div>
  ) : (
    <>
      <Link href="/collection">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to collection
        </a>
      </Link>
      <div key={dataArray.assets[0].name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={dataArray.assets[0].name}
            title={dataArray.assets[0].name}
            src={dataArray.assets[0].image.url}
            className={styles.image}
            loading="lazy"
            height={400}
            width={300}
          />
        </div>
        <div className={styles['collectible-details']}>
          <div>
            <h1 className={styles.name}>{dataArray.assets[0].name}</h1>
            <p className={styles.title}>
              {`${dataArray.assets[0].title} @ `}
              <span className={styles.company}>{dataArray.assets[0].company}</span>
            </p>
            <h2 className={styles['bio-header']}>Bio</h2>
            <p className={styles.bio}>{dataArray.assets[0].bio}</p>
            <h3 className={styles['socials-header']}>Social Media</h3>
            {dataArray.assets[0].twitter ? (
              <a
                aria-label="Twitter"
                href={dataArray.assets[0].twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            ) : (
              <span className={styles.disabled}>
                <TwitterIcon />
              </span>
            )}
            {dataArray.assets[0].github ? (
              <a
                aria-label="GitHub"
                className={styles.githubIcon}
                href={dataArray.assets[0].github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon color="#D8D8D8" size={24} />
              </a>
            ) : (
              <span className={cn(styles.githubIcon, styles.disabled)}>
                <GithubIcon color="#D8D8D8" size={24} />
              </span>
            )}
          </div>
        </div>
      </div>
      {dataArray.assets[0].talk && (
        <div className={styles['talk-details']}>
          <h3 className={styles['socials-header']}>{dataArray.assets[0].talk.title}</h3>
          <p>{dataArray.assets[0].talk.description}</p>
          <p>{account}</p>
          <p>{data}</p>
        </div>
      )}
    </>
  );
};

export default CollectionItem;
