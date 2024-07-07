function preOrderTraversal(node) {
  if (node === null) return;
  console.log(node.value);
  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
}

preOrderTraversal(root);