import Calculator from "./Calculator";

import styles from "./MainPlane.module.css";

const MainPlane: React.FC = function () {
  return (
    <main className={styles.plane}>
      <div className={styles.backgroundContainer}>
        <div className={`${styles.blob} ${styles.color1}`} />
        <div className={`${styles.blob} ${styles.color2}`} />
        <div className={`${styles.blob} ${styles.color3}`} />
        <div className={`${styles.blob} ${styles.color4}`} />
        <div className={`${styles.blob} ${styles.color5}`} />
      </div>
      <Calculator />
      <h6 className={styles.signature}>A. Ganchev</h6>
    </main>
  );
};

export default MainPlane;
