/**
 * 链表单个数据类
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  append(element) {
    const newNode = new Node(element);
    if (this.size === 0) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  insert(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error("索引越界");
    }
    const newNode = new Node(element);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;      
    } else {
      let current = this.head;
      let previous = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
  }

  remove(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error("索引越界");
    }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let current = this.head;
      let previous = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }
      previous.next = current.next;
    }
    this.size--;
  }

  print() {
    let current = this.head;
    let result = [];
    while (current !==null) {
      result.push(current.element);
      current = current.next;
    }
    console.log(result.toString());
  }
}

// 使用示例
const linkedList = new LinkedList();
linkedList.append('A'); // 添加元素 A
linkedList.append('B'); // 添加元素 B
linkedList.append('C'); // 添加元素 C
linkedList.print(); // 输出：A,B,C

linkedList.insert(1, 'D'); // 在位置 1 插入元素 D
linkedList.print(); // 输出：A,D,B,C

linkedList.remove(2); // 删除位置 2 的元素
linkedList.print(); // 输出：A,D,C


