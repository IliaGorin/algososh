import { ElementStates } from '../../types/element-states';
import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';

export type ArrayNumbers = {
  value: number;
  state: ElementStates;
};

export type TypeOfSorting = 'selection' | 'bubble';

export const delay = (timer: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timer));

export const getRandomArray = (): ArrayNumbers[] => {
  const maxLength = 17;
  const minLength = 3;
  const maxNumber = 100;
  const minNumber = 0;

  const arrLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  const array = [];
  for (let i = 0; i <= arrLength - 1; i++) {
    let randNumber =
      Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    array.push({
      value: randNumber,
      state: ElementStates.Default,
    });
  }
  return array;
};

export const swap = (
  array: ArrayNumbers[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

export const makeSelectionSorting = async (
  array: ArrayNumbers[],
  setArray: Dispatch<SetStateAction<ArrayNumbers[]>>,
  direction: Direction
) => {
  for (let i = 0; i < array.length; i++) {
    let maxIndex = i;
    array[maxIndex].state = ElementStates.Changing;
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
    for (let j = i + 1; j < array.length; j++) {
      array[j].state = ElementStates.Changing;
      setArray([...array]);
      await delay(SHORT_DELAY_IN_MS);
      if (
        direction === 'ascending'
          ? array[j].value < array[maxIndex].value
          : array[j].value > array[maxIndex].value
      ) {
        array[maxIndex].state = ElementStates.Default;
        maxIndex = j;
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    if (maxIndex !== i) {
      swap(array, i, maxIndex);
      array[i].state = ElementStates.Default;
    }
    array[maxIndex].state = ElementStates.Default;
    array[i].state = ElementStates.Modified;
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
  }
};

export const makeBubbleSorting = async (
  array: ArrayNumbers[],
  setArray: Dispatch<SetStateAction<ArrayNumbers[]>>,
  direction: Direction
) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const p = j + 1;
      array[p].state = ElementStates.Changing;
      array[j].state = ElementStates.Changing;
      setArray([...array]);
      await delay(SHORT_DELAY_IN_MS);
      if (
        direction === 'ascending'
          ? array[j].value > array[p].value
          : array[j].value < array[p].value
      ) {
        swap(array, j, p);
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
      }
      array[j].state = ElementStates.Default;
      array[p].state = ElementStates.Default;
      setArray([...array]);
    }
    array[array.length - i - 1].state = ElementStates.Modified;
    setArray([...array]);
  }
};
