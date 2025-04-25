import { useState } from "react";

import Display from "../components/Display";
import KeyPad from "../components/KeyPad";
import styles from "./Calculator.module.css";

const Calculator: React.FC = function () {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);

  const onCalculateResult = () => {
    if (expression.length === 0) return;

    const startsWithOperator = /^[\+\-×÷]/.test(expression);

    const preparedExpression = expression
      .replaceAll("÷", "/")
      .replaceAll("×", "*");

    const finalExpression = startsWithOperator
      ? `${result}${preparedExpression}`
      : preparedExpression;

    try {
      setResult(eval(finalExpression));
    } catch (error) {
      setResult(NaN);
    }

    setExpression("");
  };

  const onResetCalculator = () => {
    setExpression("");
    setResult(0);
  };

  return (
    <div className={styles.calculator}>
      <Display expression={expression} result={result} />
      <KeyPad
        expression={expression}
        expressionHandler={setExpression}
        resultHandler={onCalculateResult}
        resetHandler={onResetCalculator}
      />
    </div>
  );
};

export default Calculator;
