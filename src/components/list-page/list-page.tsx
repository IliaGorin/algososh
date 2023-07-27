import React, { ChangeEvent, useState } from 'react';
import { LinkedList } from '../../classes/List';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import styles from './list.module.css';

export const ListPage: React.FC = () => {
  const initialArr = ['0', '25', '18', '9'];

  const [linkedList] = useState(new LinkedList<string>(initialArr));

  const delay = (timer: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, timer));

  const defaultArr = (): Circle[] => {
    let arr = [];
    for (let i = 0; i <= initialArr.length - 1; i++) {
      arr.push({ element: initialArr[i], state: ElementStates.Default });
    }
    return arr;
  };

  type Circle = {
    state: ElementStates;
    element?: string | null;
    add?: boolean;
    delete?: boolean;
    smallCircle?: {
      element?: string | null;
    };
  };

  const [indexValue, setIndexValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isProcessingAddToHead, setIsProcessingProcessingAddToHead] =
    useState(false);
  const [isProcessingAddToTail, setIsProcessingAddToTail] = useState(false);
  const [isProcessingDeleteFromTail, setIsProcessingDeleteFromTail] =
    useState(false);
  const [isProcessingDeleteFromHead, setIsProcessingDeleteFromHead] =
    useState(false);

  const [isProcessingAddByIndex, setIsProcessingAddByIndex] = useState(false);
  const [isProcessingDelByIndex, setIsProcessingDelByIndex] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [arrayForRender, setArrayForRender] = useState<Circle[]>(defaultArr());

  const addToHead = async () => {
    setIsProcessingProcessingAddToHead(true);
    setIsProcessing(true);
    linkedList.prepend(inputValue);
    arrayForRender[0] = {
      ...arrayForRender[0],
      add: true,
      smallCircle: {
        element: inputValue,
      },
    };
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender[0] = {
      ...arrayForRender[0],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    arrayForRender.unshift({
      element: inputValue,
      state: ElementStates.Modified,
    });
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender[0].state = ElementStates.Default;
    setIsProcessingProcessingAddToHead(false);
    setIsProcessing(false);
    setInputValue('');
  };

  const deleteFromHead = async () => {
    setIsProcessing(true);
    setIsProcessingDeleteFromHead(true);
    arrayForRender[0] = {
      ...arrayForRender[0],
      element: '',
      delete: true,
      smallCircle: {
        element: linkedList.deleteFromHead(),
      },
    };
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender.shift();
    setArrayForRender([...arrayForRender]);
    setIsProcessing(false);
    setIsProcessingDeleteFromHead(false);
  };

  const addToTail = async () => {
    setIsProcessing(true);
    setIsProcessingAddToTail(true);
    linkedList.append(inputValue);
    const { length } = arrayForRender;
    arrayForRender[length - 1] = {
      ...arrayForRender[length - 1],
      add: true,
      smallCircle: {
        element: inputValue,
      },
    };
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender[length - 1] = {
      ...arrayForRender[length - 1],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    arrayForRender[length] = {
      ...arrayForRender[length],
      add: false,
      state: ElementStates.Modified,
      element: inputValue,
    };

    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender.forEach((item) => (item.state = ElementStates.Default));
    setIsProcessing(false);
    setIsProcessingAddToTail(false);
    setInputValue('');
  };

  const deleteFromTail = async () => {
    setIsProcessingDeleteFromTail(true);
    setIsProcessing(true);
    const { length } = arrayForRender;
    arrayForRender[length - 1] = {
      ...arrayForRender[length - 1],
      element: '',
      delete: true,
      smallCircle: {
        element: linkedList.deleteFromTail(),
      },
    };
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender.pop();
    setArrayForRender([...arrayForRender]);
    setIsProcessingDeleteFromTail(false);
    setIsProcessing(false);
  };

  const insertByIndex = async (indexValue: number) => {
    setIsProcessing(true);
    setIsProcessingAddByIndex(true);
    linkedList.addByIndex(inputValue, indexValue);
    for (let i = 0; i <= indexValue; i++) {
      arrayForRender[i] = {
        ...arrayForRender[i],
        add: true,
        smallCircle: {
          element: inputValue,
        },
      };
      if (i > 0) {
        arrayForRender[i - 1] = {
          ...arrayForRender[i - 1],
          add: false,
          smallCircle: {
            element: null,
          },
          state: ElementStates.Changing,
        };
      }
      setArrayForRender([...arrayForRender]);
      await delay(SHORT_DELAY_IN_MS);
    }
    arrayForRender[indexValue] = {
      ...arrayForRender[indexValue],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    arrayForRender.splice(indexValue, 0, {
      element: inputValue,
      state: ElementStates.Modified,
    });
    arrayForRender.forEach((item) => (item.state = ElementStates.Default));
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    setIsProcessingAddByIndex(false);
    setIsProcessing(false);
  };

  const deleteByIndex = async (index: number) => {
    setIsProcessing(true);
    setIsProcessingDelByIndex(true);
    for (let i = 0; i <= index; i++) {
      arrayForRender[i].state = ElementStates.Changing;
      setArrayForRender([...arrayForRender]);
      await delay(SHORT_DELAY_IN_MS);
    }
    arrayForRender[index] = {
      ...arrayForRender[index],
      element: '',
      delete: true,
      smallCircle: {
        element: linkedList.deleteByIndex(index),
      },
    };
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender.splice(index, 1);
    setArrayForRender([...arrayForRender]);
    await delay(SHORT_DELAY_IN_MS);
    arrayForRender.forEach((item) => (item.state = ElementStates.Default));
    setIsProcessing(false);
    setIsProcessingDelByIndex(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <Input
          isLimitText={true}
          min={1}
          maxLength={4}
          disabled={isProcessing}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
          }}
          value={inputValue}
          extraClass={styles.input}
        />
        <Button
          type="button"
          text={'Добавить в head'}
          isLoader={isProcessingAddToHead}
          onClick={() => addToHead()}
          disabled={!inputValue || arrayForRender.length > 10 || isProcessing}
          extraClass={styles.button}
        />
        <Button
          type="button"
          text={'Добавить в tail'}
          isLoader={isProcessingAddToTail}
          onClick={() => addToTail()}
          disabled={!inputValue || isProcessing}
          extraClass={styles.button}
        />
        <Button
          type="button"
          text={'Удалить из head'}
          onClick={() => deleteFromHead()}
          isLoader={isProcessingDeleteFromHead}
          disabled={isProcessing || arrayForRender.length === 1}
          extraClass={styles.button}
        />
        <Button
          type="button"
          text={'Удалить из tail'}
          onClick={() => deleteFromTail()}
          isLoader={isProcessingDeleteFromTail}
          disabled={isProcessing || arrayForRender.length === 1}
          extraClass={styles.button}
        />
      </div>
      <div className={styles.wrapperIndex}>
        <Input
          type="number"
          placeholder="Введите индекс"
          isLimitText={true}
          min={0}
          max={arrayForRender.length - 1}
          disabled={isProcessing}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setIndexValue(e.currentTarget.value);
          }}
          value={indexValue}
          extraClass={styles.input}
        />
        <Button
          type="button"
          text={'Добавить по индексу'}
          isLoader={isProcessingAddByIndex}
          onClick={() => insertByIndex(Number(indexValue))}
          disabled={
            !indexValue ||
            !inputValue ||
            Number(indexValue) > arrayForRender.length - 1 ||
            isProcessing
          }
          extraClass={styles.buttonIndex}
        />
        <Button
          type="button"
          text={'Удалить по индексу'}
          isLoader={isProcessingDelByIndex}
          onClick={() => deleteByIndex(Number(indexValue))}
          disabled={
            !indexValue ||
            !inputValue ||
            isProcessing ||
            arrayForRender.length === 1 ||
            Number(indexValue) > arrayForRender.length - 1
          }
          extraClass={styles.buttonIndex}
        />
      </div>
      <ul className={styles.listWrapper}>
        {arrayForRender.map((item, index) => {
          return (
            <li key={index} className={styles.list}>
              <Circle
                head={index === 0 && !item.add && !item.delete ? 'head' : ''}
                tail={
                  index === arrayForRender.length - 1 &&
                  !item.add &&
                  !item.delete
                    ? 'tail'
                    : ''
                }
                letter={item.element as string}
                state={item.state}
                index={index}
              />
              {index !== arrayForRender.length - 1 && <ArrowIcon />}
              {item.add && (
                <Circle
                  isSmall={true}
                  letter={item.smallCircle?.element as string}
                  state={ElementStates.Changing}
                  extraClass={styles.add}
                />
              )}
              {item.delete && (
                <Circle
                  isSmall={true}
                  letter={item.smallCircle?.element as string}
                  state={ElementStates.Changing}
                  extraClass={styles.del}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
