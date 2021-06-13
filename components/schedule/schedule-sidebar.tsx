import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Platform, ScheduleSidebarProps } from '@lib/types';
import styles from 'styles/schedule-sidebar.module.css';
import Select from '../utils/select';
import TalkCard from './talk-card';
import { format } from 'date-fns';

const ScheduleSidebar = ({ allPlatforms }: ScheduleSidebarProps) => {
  const router = useRouter();
  const [currentPlatformSlug, setCurrentPlatformSlug] = useState(router.query.slug);
  const currentPlatform = allPlatforms.find((s: Platform) => s.slug === currentPlatformSlug);

  useEffect(() => {
    setCurrentPlatformSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Upcoming drops</h3>
      <p>{format(new Date(), 'MMM, dd, yyyy')}</p>
      <Select
        aria-label="Select a platform"
        value={currentPlatformSlug}
        onChange={e => {
          const slug = e.target.value;
          setCurrentPlatformSlug(slug);
          router.push(`/platform/${slug}`);
        }}
      >
        {allPlatforms.map(platform => (
          <option key={platform.slug} value={platform.slug}>
            {platform.name}
          </option>
        ))}
      </Select>
      <div className={styles.talks}>
        {currentPlatform?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
};

export default ScheduleSidebar;
