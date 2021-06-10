import { TicketVisualProps } from '@lib/types';
import TicketColoredMobile from './ticket-colored-mobile';
import TicketColored from './ticket-colored';
import styles from 'styles/ticket-visual.module.css';
import TicketProfile from './ticket-profile';
import TicketNumber from './ticket-number';
import TicketMono from './ticket-mono';
import TicketInfo from './ticket-info';
import TicketMonoMobile from './ticket-mono-mobile';

export default function TicketVisual({
  size = 1,
  name,
  username,
  ticketNumber,
  ticketGenerationState = 'default'
}: TicketVisualProps) {
  return (
    <>
      <div className={styles.visual} style={{ ['--size' as string]: size }}>
        <div className={styles['horizontal-ticket']}>
          {username ? <TicketColored /> : <TicketMono />}
        </div>
        <div className={styles['vertical-ticket']}>
          {username ? <TicketColoredMobile /> : <TicketMonoMobile />}
        </div>
        <div className={styles.profile}>
          <TicketProfile
            name={name}
            username={username}
            size={size}
            ticketGenerationState={ticketGenerationState}
          />
        </div>
        <div className={styles.info}>
          <TicketInfo logoTextSecondaryColor={ticketNumber ? 'var(--gradient-four)' : undefined} />
        </div>
        {ticketNumber && (
          <div className={styles['ticket-number-wrapper']}>
            <div className={styles['ticket-number']}>
              <TicketNumber number={ticketNumber} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
