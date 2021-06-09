import styles from 'styles/header.module.css';
import { HeaderProps } from '@lib/types';

const Header = ({ hero, description }: HeaderProps) => {
  return (
    <>
      <p className={styles.description}>{description}</p>
      <h1 className={styles.hero}>{hero}</h1>
    </>
  );
};

export default Header;
