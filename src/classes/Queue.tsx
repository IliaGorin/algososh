interface IQueue<T> {
  dequeue: () => void;
  enqueue: (item: T) => void;
  getQueue: () => (T | null)[];
  isEmpty: () => boolean;
  clear: () => void;
}
export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  tail = 0;
  head = 0;
  length: number = 0;
  readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  isEmpty = () => this.length === 0;

  getQueue = () => {
    return this.container;
  };
  clear = () => {
    this.container = Array(this.size);
    this.length = 0;
    this.tail = 0;
    this.head = 0;
  };

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Превышена длина');
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('Очередь пустая');
    }
    this.container[this.head % this.size] = null;
    this.length--;
    this.head++;
  };
}
