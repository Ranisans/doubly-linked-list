const Node = require("./node");

class LinkedList {
  constructor() {
    this.length = 0;
    const emptyNode = new Node();
    this._head = emptyNode;
    this._tail = emptyNode;
  }

  append(data) {
    if (this._head.data === null) {
      const node = new Node(data);
      this._tail = node;
      this._head = node;
      node.next = node;
      node.prev = node;
    } else {
      const node = new Node(data, this._tail, this._head);
      this._head.prev = node;
      this._tail.next = node;
      this._tail = node;
    }
    this.length += 1;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    let node = this._head;
    for (let i = 1; i < this.length && i <= index; i++) {
      node = node.next;
      if (i === index) break;
    }
    return node.data;
  }

  insertAt(index, data) {
    if (this._head.data === null) {
      this.append(data);
    } else {
      let node = this._head;
      for (let i = 1; i < this.length && i <= index; i++) {
        node = node.next;
        if (i === index) break;
      }

      const newNode = new Node(data, node.prev, node);

      const prevNode = node.prev;
      prevNode.next = newNode;
      node.prev = newNode;
      this.length += 1;
    }
    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.length = 0;
    const emptyNode = new Node();
    this._head = emptyNode;
    this._tail = emptyNode;
    return this;
  }

  deleteAt(index) {
    let node = this._head;
    if (0 === index) {
      if (this._head === this._tail) {
        this.length = 0;
        const emptyNode = new Node();
        this._head = emptyNode;
        this._tail = emptyNode;
      }
      this.length -= 1;
    } else {
      for (let i = 1; i < this.length && i <= index; i++) {
        node = node.next;
        if (i === index) break;
      }
      this.length -= 1;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
    return this;
  }

  reverse() {
    let node;
    const newHead = (node = this._tail);
    while (node !== this._head) {
      node.next = node.prev;
      node = node.prev;
    }
    node.next = this._head;
    this._head.prev = node;
    this._head.next = newHead;
    newHead.prev = this._head;
    this._tail = this._head;
    this._head = newHead;
    return this;
  }

  indexOf(data) {
    let node = this._head;
    if (node.data === data) return 0;
    for (let i = 1; i < this.length; i++) {
      node = node.next;
      if (node.data === data) return i;
    }
    return -1;
  }
}

module.exports = LinkedList;
