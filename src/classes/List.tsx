class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  deleteFromHead: () => T | null;
  deleteFromTail: () => T | null;
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteByIndex: (index: number) => void;
  addByIndex: (element: T, index: number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private tail: Node<T> | null;
  private head: Node<T> | null;

  constructor(initialList?: T[]) {
    this.tail = null;
    this.head = null;
    initialList?.forEach((item) => {
      this.append(item);
    });
  }

  append(element: T) {
    const node = new Node(element);
    if (!this.head || !this.tail) {
      this.tail = node;
      this.head = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    return this;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  addByIndex(element: T, index: number) {
    if (index < 0) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let currentIndex = 0;
        let current = this.head;
        while (currentIndex < index) {
          currentIndex++;
          if (current?.next && currentIndex !== index) {
            current = current?.next;
          }
        }
        if (current) {
          node.next = current.next;
          current.next = node;
        }
      }
    }
  }

  deleteByIndex(index: number) {
    if (index < 0) {
      return null;
    }
    if (!this.head) {
      return null;
    }
    if (index === 0) {
      return this.deleteFromHead();
    }
    let beforeNodeToDelete = null;
    let currentNode = this.head;
    let count = 0;
    while (count < index) {
      beforeNodeToDelete = currentNode;
      currentNode = currentNode.next!;
      count++;
    }
    beforeNodeToDelete!.next = currentNode.next!;
    return currentNode.value;
  }

  deleteFromTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.tail = null;
      this.head = null;
      return deletedTail.value;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deletedTail.value;
  }

  deleteFromHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.tail = null;
      this.head = null;
    }
    return deletedHead.value;
  }
}
