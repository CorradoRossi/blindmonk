import styles from 'styles/conf-container.module.css';

export default function ConfContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
