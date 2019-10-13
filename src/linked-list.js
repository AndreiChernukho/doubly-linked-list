const Node = require('./node');

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this._head) {
      this._head = newNode;
    } else {
      this._tail.next = newNode;
      newNode.prev = this._tail;
    }

    this._tail = newNode;
    this.length++;
    return this;
  }

  head() {
    return this._head == null ? null : this._head.data;
  }

  tail() {
    return this._tail == null ? null : this._tail.data;
  }

  at(index) {
    let node = this._head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node.data;
  }

  insertAt(index, data) {
    let node = this._head;

    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    if (node == null) {
      this.append(data);
    } else {
      let prev = node.prev;

      let newNode = new Node(data, node.prev, node);
      node.prev = newNode;

      if (index == 0) {
        this._head = newNode;
      } else {
        prev.next = newNode;
      }

      this.length++;
    }
  }

  isEmpty() {
    return this.length == 0;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    let node = this._head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    let prev = node.prev;
    let next = node.next;

    if (prev == null && next == null) {
      this.clear();
    } else if (prev == null) {
      next.prev = null;
    } else if (next == null) {
      prev.next = null;
    } else {
      prev.next = next;
      next.prev = prev;
    }

    this.length--;

    return this;
  }

  reverse() {
    let current = this._head;
    let prev = null;
    let next = null;

    while (current) {
      next = current.next;
      prev = current.prev;

      current.next = prev;
      current.prev = next;

      prev = current;
      current = next;
    }

    this._tail = this._head;
    this._head = prev;

    return this;
  }

  indexOf(data) {
    let node = this._head;
    if (node.data == data) {
      return 0;
    }

    for (let i = 1; i < this.length; i++) {
      node = node.next;
      if (node.data == data) {
        return i;
      }
    }

    return -1;
  }
}


module.exports = LinkedList;

const list = new LinkedList();
list.append(4).reverse().deleteAt(0);