/**
 * 给定一个由K个整数组成的序列{N1, N2, ..., NK}。连续子序列被定义为{Ni, Ni+1, ..., Nj}，其中1≤i≤j≤K。最大子序列和是指所有连续子序列元素之和中最大的一个。例如，给定序列{-2, 11, -4, 13, -5, -2}，其最大子序列是{11, -4, 13}，最大和为20。
 * 现在，你需要找出最大子序列和，以及对应的最大子序列的第一个和最后一个数字。
 * 输入格式：
 * 每个输入文件包含一个测试案例。每个案例占两行。第一行包含一个正整数K（≤10000）。第二行包含K个数字，数字之间由一个空格分隔。
 * 输出格式：
 * 对于每个测试案例，在一行中输出最大子序列和，以及对应的最大子序列的第一个和最后一个数字。数字之间必须用一个空格分隔，但行末不得有多余的空格。如果最大子序列不唯一，则输出i和j最小的那一个（如样例所示）。如果所有K个数字都是负数，则其最大子序列和被定义为0，此时你应该输出整个序列的第一个和最后一个数字。
 */

let list = [-2, 11, -4, 13, -5, -2, 12,3,4,5,-12,3,12,-13,12,4,2];

// 输出最大子列和、最大子列开始和结束的数字、最大子列
function getMaximum(list) {
  let maximum = 0;
  const l = list.length;
  let sum = 0;
  let allList = [];
  for (let i = 0; i < l; i++) {
    sum += list[i];
    if (sum < 0) {
      sum = 0;
      allList = [];
    } else {
      if (sum > maximum) {
        maximum = sum;
      }
      allList = [...allList, list[i]]
    }
  }
  const startEndList = [allList[0], allList[allList.length - 1]]

  // 输出
  return {maximum, startEndList, allList};
}

console.log(getMaximum(list));


// 输出最大子列和，最大子列开始的数字和最大子列结束的数字
function findMaxSubsequence(list) {
  let maxSum = 0;
  let tempSum = 0;
  let start = 0;
  let tempStart = 0;
  let end = list.length - 1;

  let allNegative = true; // 假设所有数字都是负数

  // 遍历数组，寻找最大子序列和
  for (let i = 0; i < list.length; i++) {
    tempSum += list[i];

    // 检查是否所有数字都是负数
    if (list[i] > 0) {
      allNegative = false;
    }

    if (tempSum > maxSum) {
      maxSum = tempSum;
      start = tempStart;
      end = i;
    } else if (tempSum < 0) {
      tempSum = 0;
      tempStart = i + 1;
    }
  }

  // 如果所有数字都是负数，最大子序列和为0，返回整个序列的第一个和最后一个数字
  if (allNegative) {
    maxSum = 0;
    start = 0;
    end = list.length - 1;
  }

  return [maxSum, list[start], list[end]];
}

// 测试用例
console.log(findMaxSubsequence(list));