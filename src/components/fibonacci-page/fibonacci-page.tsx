import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import styles from './fibonacci.module.css';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<string>('');
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isAcceptable, setIsAcceptable] = useState<boolean>(false);

  const getFibonacciNumbersArray = (n: number) => {
    let FibonacciNumbersArray = [0, 1];

    if (n === 1) {
      return FibonacciNumbersArray.slice(0, 1);
    } else if (n === 2) {
      return FibonacciNumbersArray;
    } else {
      for (let i = 2; i < n + 1; i++) {
        FibonacciNumbersArray.push(
          FibonacciNumbersArray[i - 2] + FibonacciNumbersArray[i - 1]
        );
      }
    }
    return FibonacciNumbersArray;
  };

  const handleFibonacci = () => {
    let delay = SHORT_DELAY_IN_MS;
    if (Number(inputNumber) > 0) {
      setIsAcceptable(true);
    }
    if (Number(inputNumber) > 0) {
      setIsLoader(true);
      const calcArray = getFibonacciNumbersArray(Number(inputNumber));
      for (let i = 0; i < calcArray.length; i++) {
        setTimeout(() => {
          setFibonacciArray(calcArray.slice(0, i + 1));
        }, delay);
        delay += 500;
      }
      setInputNumber('');
      setTimeout(() => {
        setIsLoader(false);
      }, delay);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input
          autoFocus
          placeholder="Введите число"
          type="number"
          isLimitText={true}
          max={19}
          min={1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputNumber(e.currentTarget.value);
          }}
          value={inputNumber}
          extraClass={styles.input}
        />
        <Button
          type={'button'}
          text={'Рассчитать'}
          isLoader={isLoader}
          disabled={
            !inputNumber || Number(inputNumber) > 19 || Number(inputNumber) < 1
          }
          onClick={(e) => {
            handleFibonacci();
          }}
        />
      </div>
      {isAcceptable && (
        <ul className={styles.numbersContainer}>
          {fibonacciArray.map((item: number, indexOfRender: number) => (
            <Circle
              key={indexOfRender}
              letter={`${item}`}
              index={indexOfRender}
            />
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
