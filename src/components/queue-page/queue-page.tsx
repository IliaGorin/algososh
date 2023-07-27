import React, { useState, useMemo, ChangeEvent, useCallback } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Queue } from '../../classes/Queue';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './queue.module.css';

export const QueuePage: React.FC = () => {
  const [arrayForRender, setArrayForRender] = useState<
    Array<string | number | null>
  >([]);
  const [loader, setLoader] = useState({ dequeue: false, enqueue: false });
  const [letters, setLetters] = useState<string>('');
  const length = 7;

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters(e.target.value.trim());
  };

  const queue = useMemo(() => {
    return new Queue<string>(length);
  }, []);

  const dequeue = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoader({ ...loader, dequeue: true });
    setTimeout(() => {
      queue.dequeue();
      setLoader({ ...loader, dequeue: false });
      setArrayForRender([...queue.getQueue()]);
    }, SHORT_DELAY_IN_MS);
  };

  const enqueue = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      setLoader({ ...loader, enqueue: true });
      setTimeout(() => {
        queue.enqueue(letters);
        setLoader({ ...loader, enqueue: false });
        setArrayForRender([...queue.getQueue()]);
      }, SHORT_DELAY_IN_MS);
      setLetters('');
    },
    [letters, setLoader, setArrayForRender, loader, queue]
  );

  const clearQueue = () => {
    queue.clear();
    setArrayForRender([...queue.getQueue()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.wrapper} onSubmit={enqueue}>
        <Input
          name="value"
          isLimitText={true}
          maxLength={4}
          onChange={changeValue}
          value={letters}
          extraClass={styles.input}
        />
        <Button
          text="Добавить"
          type="submit"
          disabled={
            letters === '' ||
            queue.tail === queue.size ||
            loader.dequeue ||
            loader.enqueue
          }
          isLoader={loader.enqueue}
          extraClass="mr-6"
        />
        <Button
          text="Удалить"
          type="button"
          onClick={dequeue}
          disabled={
            arrayForRender.length === 0 || loader.dequeue || loader.enqueue
          }
          isLoader={loader.dequeue}
          extraClass="mr-20"
        />
        <Button
          text="Очистить"
          type="button"
          disabled={
            arrayForRender.length === 0 || loader.dequeue || loader.enqueue
          }
          onClick={clearQueue}
          extraClass="ml-20"
        />
      </form>
      {arrayForRender && (
        <div className={styles.array}>
          {arrayForRender.map((value, index) => (
            <Circle
              index={index}
              key={index}
              letter={value ? value.toString() : ''}
              state={
                (index === queue.head && loader.dequeue) ||
                (index === queue.tail && loader.enqueue)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={queue.length > 0 && queue.head === index ? 'head' : null}
              tail={
                queue.length > 0 && queue.tail - 1 === index ? 'tail' : null
              }
            />
          ))}
        </div>
      )}
    </SolutionLayout>
  );
};
