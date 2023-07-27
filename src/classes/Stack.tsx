interface IStack<T> {
  pop: () => T | undefined;
  push: (item: T) => void;
  getStack: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  pop = (): T | undefined => {
    return this.container.pop();
  };

  push = (item: T): void => {
    this.container.push(item);
  };

  getStack = (): Array<T> => {
    return this.container;
  };

  clear = () => (this.container = []);
}
