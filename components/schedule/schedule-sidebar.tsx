import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stage, ScheduleSidebarProps } from '@lib/types';
import styles from 'styles/schedule-sidebar.module.css';
import Select from '../utils/select';
import TalkCard from './talk-card';
import { format } from 'date-fns';

const ScheduleSidebar = ({ allStages }: ScheduleSidebarProps) => {
  const router = useRouter();
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug);
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug);

  useEffect(() => {
    setCurrentStageSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Upcoming drops</h3>
      <p>{format(new Date(), 'MMM, dd, yyyy')}</p>
      <Select
        aria-label="Select a stage"
        value={currentStageSlug}
        onChange={e => {
          const slug = e.target.value;
          setCurrentStageSlug(slug);
          router.push(`/stage/${slug}`);
        }}
      >
        {allStages.map(stage => (
          <option key={stage.slug} value={stage.slug}>
            {stage.name}
          </option>
        ))}
      </Select>
      <div className={styles.talks}>
        {currentStage?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
};

export default ScheduleSidebar;
