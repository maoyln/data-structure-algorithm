function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.value);
  inOrderTraversal(node.right);
}

inOrderTraversal(root);