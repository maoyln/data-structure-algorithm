/**
 * 需求，给定一个集合和集合中的一个数据，通过二分法找到该数据在集合中的下标，如果该数据不在该集合中则返回-1；
 */

let list = [1, 3, 5, 6, 7, 8, 9, 10, 11, 14, 23, 32, 43, 51, 57, 59];
let k = 8;

function dichotomy(arr, k) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (k === arr[mid]) {
      return mid;
    } else if (arr[mid] < k) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

console.log(dichotomy(list, k));