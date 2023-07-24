import { ArrayNumbers } from './sorting-page';
import { ElementStates } from '../../types/element-states';

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
  array: number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};
