import styles from 'styles/home-container.module.css';

export default function HomeContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
