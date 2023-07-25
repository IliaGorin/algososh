import React, { useEffect, useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting.module.css';
import { ElementStates } from '../../types/element-states';
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

export const SortingPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<TypeOfSorting>('selection');
  const [arrayForRender, setArrayForRender] = useState<ArrayNumbers[]>([]);

  useEffect(() => {
    setArrayForRender(getRandomArray());
  }, []);

  const handleSelectionOfMethod = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedMethod(e.target.value === 'selection' ? 'selection' : 'bubble');
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.mainWrapper}>
        <RadioInput
          label="Выбор"
          defaultChecked
          value={'selection'}
          onChange={handleSelectionOfMethod}
          checked={selectedMethod === 'selection'}
        />
        <RadioInput
          label="Пузырёк"
          value={'bubble'}
          onChange={handleSelectionOfMethod}
          checked={selectedMethod === 'bubble'}
        />
        <Button text={'По возрастанию'} />
        <Button text={'По убыванию'} />
        <Button text={'Новый массив'} />
      </form>
      <ul className={styles.columns}>
        {arrayForRender.map((element: ArrayNumbers, index: number) => (
          <Column index={element.value} state={element.state} key={index} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
