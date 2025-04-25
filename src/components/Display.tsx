import styles from "./Display.module.css";

const Display: React.FC<{ expression: string; result: number }> = function ({
  expression,
  result,
}) {
  const getDecimalPlaces = (num: number) => {
    if (Math.floor(num) === num) return 0;
    return num.toString().split(".")[1]?.length || 0;
  };

  const decimalPlaces = getDecimalPlaces(result);
  const truncatedResult = decimalPlaces > 4 ? result.toFixed(4) : result;

  const fontSizeResult =
    Math.max(1.5, Math.min(2.8, 2.8 - String(truncatedResult).length * 0.08)) +
    "rem";
  const fontSizeExpression =
    Math.max(1, Math.min(1.4, 1.4 - String(expression).length * 0.02)) + "rem";

  return (
    <div className={styles.display}>
      <h1 className={styles.result} style={{ fontSize: fontSizeResult }}>
        {truncatedResult}
      </h1>
      <h2
        className={styles.expression}
        style={{ fontSize: fontSizeExpression }}
      >
        {expression}
      </h2>
    </div>
  );
};

export default Display;
