function postOrderTraversal(node) {
  if (node === null) return;
  postOrderTraversal(node.left);
  postOrderTraversal(node.right);
  console.log(node.value);
}

postOrderTraversal(root);