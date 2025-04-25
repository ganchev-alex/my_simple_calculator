import { useState } from "react";

import styles from "./Button.module.css";

const Button: React.FC<{
  label: string;
  onClickEvent: () => void;
  disabledFlag: boolean;
}> = function ({ label, onClickEvent, disabledFlag }) {
  const [shake, setShake] = useState(false);

  const handleClick = () => {
    if (disabledFlag) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    } else {
      onClickEvent();
    }
  };

  return (
    <div
      className={`${styles.key} ${label === "del" ? styles["del-key"] : ""} ${
        label === "result" ? styles["result-key"] : ""
      } ${shake ? styles["button-shake"] : ""}`}
    >
      <button className={styles.button} onClick={handleClick}>
        {label}
      </button>
      <div className={styles.shadow} />
    </div>
  );
};

export default Button;
