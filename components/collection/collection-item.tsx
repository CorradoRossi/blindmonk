import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/collection-section.module.css';
import GithubIcon from '@components/icons/icon-github';
import TwitterIcon from '@components/icons/icon-twitterr';
import { CollectionSectionProps } from '@lib/types';

const CollectionItem = ({ collectible }: CollectionSectionProps) => {
  return (
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
      <div key={collectible.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={collectible.name}
            title={collectible.name}
            src={collectible.image.url}
            className={styles.image}
            loading="lazy"
            height={400}
            width={300}
          />
        </div>
        <div className={styles['collectible-details']}>
          <div>
            <h1 className={styles.name}>{collectible.name}</h1>
            <p className={styles.title}>
              {`${collectible.title} @ `}
              <span className={styles.company}>{collectible.company}</span>
            </p>
            <h2 className={styles['bio-header']}>Bio</h2>
            <p className={styles.bio}>{collectible.bio}</p>
            <h3 className={styles['socials-header']}>Social Media</h3>
            {collectible.twitter ? (
              <a
                aria-label="Twitter"
                href={collectible.twitter}
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
            {collectible.github ? (
              <a
                aria-label="GitHub"
                className={styles.githubIcon}
                href={collectible.github}
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
      {collectible.talk && (
        <div className={styles['talk-details']}>
          <h3 className={styles['socials-header']}>{collectible.talk.title}</h3>
          <p>{collectible.talk.description}</p>
        </div>
      )}
    </>
  );
};

export default CollectionItem;
