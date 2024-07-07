function levelOrderTraversal(node) {
  if (node === null) return;
  const queue = [node];
  while (queue.length > 0) {
    const current = queue.shift();
    console.log(current.value);
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
}

levelOrderTraversal(root);