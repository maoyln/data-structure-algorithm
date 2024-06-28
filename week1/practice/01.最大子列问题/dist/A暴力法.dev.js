"use strict";

/**
 * 暴力法解决最大子列和问题
 * 问题描述： 
 * 给定一个整数数组nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例： 假设我们有数组nums = [-2,1,-3,4,-1,2,1,-5,4]，
 * 结果： 最大子列为[4,-1,2,1]，其最大和为6。
 */

/**
 * 暴力法：
 * 解题思路：我们需要遍历数组的所有可能子列，并计算它们的和，然后找到最大的那个和。
 * 暴力法的时间复杂度是O(n^3)，
 * 因为它涉及到三层嵌套循环：外两层循环用来确定子列的起始和结束位置，
 * 内层循环用来计算子列的和。
 */
var list = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

function getMaximum(list) {
  var maximum = 0;
  var listLength = list.length;

  for (var i = 0; i < listLength; i++) {
    for (var j = i; j < listLength; j++) {
      var sum = 0;

      for (var k = i; k < j; k++) {
        sum += list[k];
      }

      if (sum > maximum) maximum = sum;
    }
  }

  return maximum;
}

var maximum = getMaximum(list);
console.log(maximum);
/**
 * 这段代码通过三层循环遍历数组的所有可能子列，计算每个子列的和，并不断更新最大和。
 * 请注意，虽然这种方法可以正确解决问题，但由于其低效的时间复杂度，它不适用于处理大规模数据。
 * 在实际应用中，推荐使用更高效的算法，如Kadane算法，它的时间复杂度为O(n)。
 */