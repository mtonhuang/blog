#### leetcode刷题心得分享
> 博主在刷leetcode时认为还不错的题目，大部分有发布个人题解（貌似反响还可以~），在此记录心得并且分享给大家（以下排序不分先后，并在代码里附带了本人leetcode链接，欢迎大家踩踩）

##### 369. 两个数组的交集

给定两个数组，编写一个函数来计算它们的交集。

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]

---

解题思路：

**妙用includes和set方法**

```JS

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

var intersection = function(nums1, nums2) {
    let arr = [];
    for(let i = 0; i < nums1.length; i++) {
        if (nums2.includes(nums1[i])) {
            arr.push(nums1[i]);
        }
    }
    return Array.from(new Set(arr))
};

作者：mtonhuang
链接：https://leetcode-cn.com/problems/intersection-of-two-arrays/solution/includessettou-lan-jie-fa-by-mtonhuang/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

##### 1464. 数组中两元素的最大乘积

给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。

请你计算并返回该式的最大值。

示例：
输入：nums = [3,4,5,2]
输出：12 
解释：如果选择下标 i=1 和 j=2（下标从 0 开始），则可以获得最大值，(nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12 

---

解题思路：
- 求出最大值a
- 删除a
- 再求出最大值b
- 进而求出答案

```JS
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    let a = Math.max(...nums);
    nums.splice(nums.indexOf(a), 1, '');
    let b = Math.max(...nums);
    return (a - 1) * (b - 1)
};

作者：mtonhuang
链接：https://leetcode-cn.com/problems/maximum-product-of-two-elements-in-an-array/solution/miao-yong-mathmaxspliceindexof-by-mtonhuang/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```