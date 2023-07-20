import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import styles from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS } from '../../constants/delays';

export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>('');
  const [stringToRender, setStringToRender] = useState<string[]>([]);
  let reverseString: string[] = [];

  function reverse(inputString: string[]): string[] {
    // const symbolsArr = inputString.split('');
    if (inputString.length === 1) return inputString;
    let end = inputString.length - 1;
    // let middle = Math.floor(symbolsArr.length / 2);
    let tempElement = inputString[0];
    inputString[0] = inputString[end];
    inputString[end] = tempElement;

    return inputString;
  }

  const array = [
    ['1', '2', '3', '4', '5'],
    ['5', '2', '3', '4', '1'],
    ['5', '4', '3', '2', '1'],
  ];

  const delay = (time: number) =>
    new Promise<void>((res) => setTimeout(res, time));

  const handleReverse = async () => {
    // await delay(DELAY_IN_MS);
    for (let i = 0; i < 3; i++) {
      setStringToRender(array[i]);
      console.log('count ', i);
      await delay(DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputString(e.currentTarget.value);
          }}
        ></Input>
        <Button
          type={'button'}
          text={'Развернуть'}
          onClick={(e) => {
            handleReverse();
          }}
        >
          Button
        </Button>
      </div>
      <ul className={styles.lettersContainer}>
        {stringToRender.map((symbol, index) => (
          <li key={index}>
            <Circle letter={symbol} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
