/**
 * 在线处理,也叫动态规划（Kadane算法）
 */

/**
 * 这是解决这个问题的最高效方式。算法的核心是维护两个变量：当前元素之前的最大子序列和（max_ending_here），以及到目前为止的最大子序列和（max_so_far）。
 * 遍历数组，更新这两个变量，最终max_so_far就是所求的最大子序列和。这种方法的时间复杂度是O(n)。
 */
const list = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
function getMaximum(list) {
  let maximum = 0;
  const l = list.length;
  let sum = 0;
  for (let i = 0; i < l; i++) {
    sum += list[i];
    if (sum < 0) {
      sum = 0;
    }
    if (sum > maximum) {
      maximum = sum;
    }
  }
  return maximum;
}

const maximum = getMaximum(list);
console.log(maximum);

/**
 * 也可也可以用下面的处理方法
 */
function getMaximum_1(list) {
  let maximum = list[0];
  const l = list.length;
  let sum = list[0];
  for (let i = 0; i < l; i++) {
    sum = Math.max(list[i], sum + list[i]);
    maximum = Math.max(sum, maximum);
  }
  return maximum;
}

const maximum_1 = getMaximum_1(list);
console.log(maximum_1);
