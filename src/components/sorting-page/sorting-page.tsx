import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting.module.css';
import { ElementStates } from '../../types/element-states';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { getRandomArray } from './utils';

export type ArrayNumbers = {
  value: number;
  state: ElementStates;
};

export type Direction = 'ascending' | 'descending';

export const SortingPage: React.FC = () => {
  const [arrayForRender, setArrayForRender] = useState<ArrayNumbers[]>([]);

  useEffect(() => {
    setArrayForRender(getRandomArray());
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <RadioInput label="Выбор" defaultChecked />
        <RadioInput label="Пузырёк" />
        <div className={styles.buttonsWrapper}>
          <Button text={'По возрастанию'} />
          <Button text={'По убыванию'} />
        </div>
        <Button text={'Новый массив'} />
      </div>
      <ul className={styles.showarray}>
        {arrayForRender.map((element: ArrayNumbers, index: number) => (
          <Column index={element.value} state={element.state} key={index} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
