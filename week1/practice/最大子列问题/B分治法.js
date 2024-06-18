/**
 * 分治法是解决最大子列问题的一种有效方法，其基本思想是将一个大问题分解成小问题逐个击破。对于最大子列问题，可以将数组分成两半，分别求解左半部分和右半部分的最大子列和，以及跨越中点的最大子列和，然后取这三者中的最大值作为整个数组的最大子列和。这种方法的时间复杂度是O(n log n)。
 * @param {*} arr 
 * @param {*} left 
 * @param {*} mid 
 * @param {*} right 
 * @returns 
 */

function maxCrossingSum(arr, left, mid, right) {
  let sum = 0;
  let leftSum = 0;
  // 包括中点的左半部分的最大子列和
  for (let i = mid; i >= left; i--) {
    sum += arr[i];
    if (sum > leftSum) leftSum = sum;
  }

  sum = 0;
  let rightSum = 0;
  // 包括中点的右半部分的最大子列和
  for (let i = mid + 1; i <= right; i++) {
    sum += arr[i];
    if (sum > rightSum) rightSum = sum;
  }

  // 返回跨越中点的最大子列和
  return leftSum + rightSum;
}

function maxSubArraySum(arr, left, right) {
  // 基本情况
  if (left == right) {
    return arr[left];
  }

  // 找到中点
  let mid = Math.floor((left + right) / 2);

  // 返回以下三者中的最大值：
  // 1. 左半部分的最大子列和
  // 2. 右半部分的最大子列和
  // 3. 跨越中点的最大子列和
  return Math.max(
    maxSubArraySum(arr, left, mid),
    maxSubArraySum(arr, mid + 1, right),
    maxCrossingSum(arr, left, mid, right)
  );
}

// 示例
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArraySum(nums, 0, nums.length - 1)); // 输出最大子列和，例如上述数组的最大子列和为6

// 这段代码首先定义了maxCrossingSum函数，用于计算跨越中点的最大子列和。然后，maxSubArraySum函数通过递归地将数组分成更小的部分，分别求解左半部分和右半部分的最大子列和，以及跨越中点的最大子列和，最后取这三者中的最大值作为结果。这种分而治之的策略使得问题得以有效解决。