/**
 * 链式存储
 */
class TreeNode {
  constructor(value) {
    this.value = value; // 节点数据
    this.left = null;   // 左子节点指针
    this.right = null;  // 右子节点指针
  }
}

// 创建根节点
const root = new TreeNode('root');

// 创建子节点
const leftChild = new TreeNode('left');
const rightChild = new TreeNode('right');

// 连接子节点
root.left = leftChild;
root.right = rightChild;

console.log(root);