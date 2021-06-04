import styles from 'styles/header.module.css';

type Props = {
  hero: React.ReactNode;
  description: React.ReactNode;
};

export default function Header({ hero, description }: Props) {
  return (
    <>
      <p className={styles.description}>{description}</p>
      <h1 className={styles.hero}>{hero}</h1>
    </>
  );
}
