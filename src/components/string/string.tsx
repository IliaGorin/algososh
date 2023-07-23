import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import styles from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

export const stateCircle = (
  currentIndex: number,
  indexOfRender: number,
  arr: Array<string | number>
) => {
  let arrLength = arr.length - 1;
  if (
    indexOfRender < currentIndex ||
    indexOfRender > arrLength - currentIndex
  ) {
    return ElementStates.Modified;
  }
  if (
    indexOfRender === currentIndex ||
    indexOfRender === arrLength - currentIndex
  ) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

export const StringComponent: React.FC = () => {
  const [inputString, setInputValue] = useState<string>('');
  const [arrayForRender, setArrayForRender] = useState<Array<string>>([]);
  const [isloader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleReverse = () => {
    const symbolsArray = inputString.split('');
    let endOfArray = symbolsArray.length - 1;
    let middle = Math.ceil(symbolsArray.length / 2);

    setIsLoader(true);
    setArrayForRender([...symbolsArray]);

    setCurrentIndex(0);
    setIsLoader(false);
    setInputValue('');
    let delay = DELAY_IN_MS;

    for (let i = 0; i < middle; i++) {
      setTimeout(() => {
        [symbolsArray[i], symbolsArray[endOfArray - i]] = [
          symbolsArray[endOfArray - i],
          symbolsArray[i],
        ];
        setCurrentIndex((i) => i + 1);
        setArrayForRender([...symbolsArray]);
      }, 1000 + delay);
      delay += 1000;
    }

    return symbolsArray;
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input
          placeholder="Введите текст"
          isLimitText={true}
          maxLength={11}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
          }}
          value={inputString}
          extraClass="mr-6"
        />
        <Button
          type={'button'}
          text={'Развернуть'}
          isLoader={isloader}
          disabled={inputString === ''}
          onClick={(e) => {
            handleReverse();
          }}
        />
      </div>
      <ul className={styles.lettersContainer}>
        {arrayForRender.map((item: string, indexOfRender: number) => (
          <Circle
            key={indexOfRender}
            letter={item}
            state={stateCircle(currentIndex, indexOfRender, arrayForRender)}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
