import { useEffect, useState } from "react";

import Button from "./Button";

import styles from "./KeyPad.module.css";

const keyLabels = [
  "c",
  "del",
  "÷",
  "1",
  "2",
  "3",
  "×",
  "4",
  "5",
  "6",
  "+",
  "7",
  "8",
  "9",
  "-",
  "result",
  "0",
  ".",
];

const KeyPad: React.FC<{
  expression: string;
  expressionHandler: React.Dispatch<React.SetStateAction<string>>;
  resultHandler: () => void;
  resetHandler: () => void;
}> = function ({ expression, expressionHandler, resultHandler, resetHandler }) {
  const [isCalculationDisabled, setIsCalculationDisabled] = useState(false);
  const [isDevisionByZero, setIsDevisionByZero] = useState(false);

  const onAppendToExpression = (newSymbol: string) => {
    const isOperand = (char: string) => ["+", "-", "×", "÷"].includes(char);
    const isNumber = (char: string) => /\d/.test(char);

    expressionHandler((prevState) => {
      const lastChar = prevState.slice(-1);

      const getLastNumberSegment = () => {
        const match = prevState.match(/([^\+\-×÷]*)$/);
        return match ? match[0] : "";
      };

      const lastSegment = getLastNumberSegment();

      if (
        (prevState === "0" ||
          (isOperand(prevState.slice(-2, -1)) && lastChar === "0")) &&
        isNumber(newSymbol)
      ) {
        return prevState;
      }

      if (newSymbol === "." && lastSegment.includes(".")) {
        return prevState;
      }

      if (lastChar === "." && newSymbol === ".") {
        return prevState;
      }

      if (isOperand(newSymbol) && isOperand(lastChar)) {
        return prevState.slice(0, -1) + newSymbol;
      }

      if (
        newSymbol === "." &&
        (isOperand(lastChar) || expression.length === 0)
      ) {
        return prevState + "0.";
      }

      if (prevState.endsWith(".") && isOperand(newSymbol)) {
        return prevState + "0" + newSymbol;
      }

      return prevState + newSymbol;
    });
  };

  const onDeleteFromExpression = () => {
    expressionHandler((prevState) =>
      prevState.substring(0, prevState.length - 1)
    );
  };

  useEffect(() => {
    const lastChar = expression.slice(-1);

    const endsWithOperator = ["+", "-", "×", "÷"].includes(lastChar);

    const divisionByZeroPattern = /÷0(\.0*)?($|[\+\-×÷])/;
    const hasDivisionByZero = divisionByZeroPattern.test(expression);

    setIsDevisionByZero(lastChar === "÷");
    setIsCalculationDisabled(endsWithOperator || hasDivisionByZero);
  }, [expression]);

  return (
    <div className={styles.keypad}>
      {keyLabels.map((label) => {
        let selectedAction = () => {};
        let disabledFlag = false;

        switch (label) {
          case "c":
            selectedAction = resetHandler;
            disabledFlag = false;
            break;
          case "del":
            selectedAction = onDeleteFromExpression;
            disabledFlag = false;
            break;
          case "result":
            selectedAction = resultHandler;
            disabledFlag = isCalculationDisabled;
            break;
          case "0":
            selectedAction = () => onAppendToExpression(label);
            disabledFlag = isDevisionByZero;
            break;
          default:
            selectedAction = () => onAppendToExpression(label);
        }

        return (
          <Button
            key={label}
            label={label}
            onClickEvent={selectedAction}
            disabledFlag={disabledFlag}
          />
        );
      })}
    </div>
  );
};

export default KeyPad;
