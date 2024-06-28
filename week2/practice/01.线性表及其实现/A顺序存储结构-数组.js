/**
 * 使用数组的形式存储线性表
 */

class ArrayList {
  constructor() {
    this.data = [];
  }

  /**
   * 获取当前数组长度
   * @returns 
   */
  size() {
    return this.data.length;
  }

  /**
   * 根据下标获取当前下标中数组中数据
   * @param {*} index 下标
   * @returns 返回当前数据 
   */
  get(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error('索引越界');
    }
    return this.data[index];
  }

  /**
   * 添加
   * @param {*} index 下标 
   * @param {*} element 内容
   */
  insert(index, element) {
    if (index < 0 || index > this.size()) {
      throw new Error('索引越界');
    }
    this.data.splice(index, 0, element);
  }

  /**
   * 根据下标删除数组中对象，并返回删除的对象
   * @param {*} index 
   * @returns 
   */
  remove(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error('索引越界');
    }
    return this.data.splice(index, 1)[0];
  }

  /**
   * 字符串形式打印data数组
   */
  print() {
     console.log(this.data.toString());
  }
}

const list = new ArrayList();
list.insert(0, 'A');
list.insert(1, 'B');
list.insert(2, 'C');
list.print();
console.log(list.size());

console.log(list.get(1));

list.remove(1);
list.print();
console.log(list.size());
