import styles from 'styles/home-container.module.css';

const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default HomeContainer;
