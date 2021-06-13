import cn from 'classnames';
import { Platform, Talk, SchedulePlatformProps } from '@lib/types';
import styles from 'styles/schedule.module.css';
import TalkCard from './talk-card';

function PlatformRow({ platform }: { platform: Platform }) {
  // Group talks by the time block
  const timeBlocks = platform.schedule.reduce((allBlocks: any, talk) => {
    allBlocks[talk.start] = [...(allBlocks[talk.start] || []), talk];
    return allBlocks;
  }, {});

  return (
    <div key={platform.name} className={styles.row}>
      <h3 className={cn(styles['platform-name'], styles[platform.slug])}>
        <span>{platform.name}</span>
      </h3>
      <div className={cn(styles.talks, styles[platform.slug])}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((talk: Talk, index: number) => (
              <TalkCard key={talk.title} talk={talk} showTime={index === 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Schedule = ({ allPlatforms }: SchedulePlatformProps) => {
  return (
    <div className={styles.container}>
      <div className={styles['row-wrapper']}>
        {allPlatforms.map(platform => (
          <PlatformRow key={platform.slug} platform={platform} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
