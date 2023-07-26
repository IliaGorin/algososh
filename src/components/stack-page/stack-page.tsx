import React, { useState, useMemo, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Stack } from '../../classes/Stack';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './stack.module.css';

export const StackPage: React.FC = () => {
  const [arrayForRender, setArrayForRender] = useState<Array<string | number>>(
    []
  );
  const [loader, setLoader] = useState({ pop: false, push: false });
  const [letters, setLetters] = useState<string>('');

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters(e.target.value.trim());
  };

  const addValueToStack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader({ ...loader, push: true });
    stack.push(letters);
    setLetters('');
    setArrayForRender([...stack.getStack()]);
    setTimeout(() => {
      setLoader({ ...loader, push: false });
    }, SHORT_DELAY_IN_MS);
  };

  const removeValueFromStack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader({ ...loader, pop: true });
    stack.pop();
    setTimeout(() => {
      setArrayForRender([...stack.getStack()]);
      setLoader({ ...loader, push: false });
    }, SHORT_DELAY_IN_MS);
  };

  const clearStack = () => {
    setArrayForRender(stack.clear());
  };

  const stack = useMemo(() => {
    return new Stack<string | number>();
  }, []);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.wrapper} onSubmit={addValueToStack}>
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
          disabled={letters === '' || loader.push || loader.pop}
          isLoader={loader.push}
          extraClass="mr-6"
        />
        <Button
          text="Удалить"
          type="button"
          onClick={removeValueFromStack}
          disabled={arrayForRender.length < 1 || loader.push || loader.pop}
          isLoader={loader.pop}
          extraClass="mr-20"
        />
        <Button
          text="Очистить"
          type="button"
          disabled={arrayForRender.length < 1 || loader.push || loader.pop}
          onClick={clearStack}
          extraClass="ml-20"
        />
      </form>
      {arrayForRender && (
        <div className={styles.array}>
          {arrayForRender.map((value, index) => (
            <Circle
              key={index}
              index={index}
              letter={value ? value.toString() : ''}
              head={index === arrayForRender.length - 1 ? 'top' : null}
              state={
                index === arrayForRender.length - 1 &&
                (loader.push || loader.pop)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      )}
    </SolutionLayout>
  );
};
