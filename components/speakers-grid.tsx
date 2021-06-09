import Link from 'next/link';
import Image from 'next/image';
import { SpeakersGridProps } from '@lib/types';
import styles from 'styles/speakers-grid.module.css';

const SpeakersGrid = ({ speakers }: SpeakersGridProps) => {
  return (
    <div className={styles.grid}>
      {speakers.map(speaker => (
        <Link key={speaker.name} href={`/speakers/${speaker.slug}`}>
          <a role="button" tabIndex={0} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                alt={speaker.name}
                src={speaker.image.url}
                className={styles.image}
                loading="lazy"
                quality="50"
                title={speaker.name}
                width={300}
                height={300}
              />
            </div>
            <div className={styles.cardBody}>
              <div>
                <h2 className={styles.name}>{speaker.name}</h2>
                <p className={styles.title}>
                  {`${speaker.title} @ `}
                  <span className={styles.company}>{speaker.company}</span>
                </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SpeakersGrid;
