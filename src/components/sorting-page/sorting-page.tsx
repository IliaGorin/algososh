import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting.module.css';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import {
  getRandomArray,
  ArrayNumbers,
  makeBubbleSorting,
  makeSelectionSorting,
  TypeOfSorting,
} from './utils';
import { Direction } from '../../types/direction';

export const SortingPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<TypeOfSorting>('selection');
  const [arrayForRender, setArrayForRender] = useState<ArrayNumbers[]>([]);
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const [isAscending, setIsAscending] = useState<boolean>(false);

  useEffect(() => {
    setArrayForRender(getRandomArray());
  }, []);

  const makeNewArray = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setArrayForRender(getRandomArray());
  };

  const toSortSelection = (direction: Direction) => {
    makeSelectionSorting(
      arrayForRender,
      setArrayForRender,
      direction,
      setIsAscending,
      setIsDescending
    );
  };

  const toSortBubble = (direction: Direction) => {
    makeBubbleSorting(
      arrayForRender,
      setArrayForRender,
      direction,
      setIsAscending,
      setIsDescending
    );
  };

  const toSortArray = (direction: Direction) => {
    if (selectedMethod === 'selection') {
      toSortSelection(direction);
    } else {
      toSortBubble(direction);
    }
  };

  const handleMethodSelection = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedMethod(e.target.value === 'selection' ? 'selection' : 'bubble');
  };

  const handleAscendingSorting = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toSortArray(Direction.Ascending);
  };

  const handleDescendingSorting = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toSortArray(Direction.Descending);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.mainWrapper}>
        <RadioInput
          label="Выбор"
          value={'selection'}
          onChange={handleMethodSelection}
          checked={selectedMethod === 'selection'}
          disabled={isDescending || isAscending}
        />
        <RadioInput
          label="Пузырёк"
          value={'bubble'}
          onChange={handleMethodSelection}
          checked={selectedMethod === 'bubble'}
          disabled={isDescending || isAscending}
        />
        <Button
          text={'По возрастанию'}
          disabled={arrayForRender.length === 0 || isDescending}
          isLoader={isAscending}
          sorting={Direction.Ascending}
          onClick={handleAscendingSorting}
        />
        <Button
          text={'По убыванию'}
          disabled={arrayForRender.length === 0 || isAscending}
          isLoader={isDescending}
          sorting={Direction.Descending}
          onClick={handleDescendingSorting}
        />
        <Button
          text={'Новый массив'}
          disabled={isDescending || isAscending}
          onClick={makeNewArray}
        />
      </div>
      <ul className={styles.columns}>
        {arrayForRender.map((element: ArrayNumbers, index: number) => (
          <Column index={element.value} state={element.state} key={index} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
