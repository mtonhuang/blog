### 实现一个map，filter函数

1. map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中。

```js
[1, 2, 3].map(val=> val + 1) // -> [2, 3, 4]
```

另外 map 的回调函数接受三个参数，分别是当前索引元素，索引，原数组。

```js
array.map(function(currentValue, index, arr), thisIndex)
```
function(currentValue, index, arr)必须为一个函数，数组中的每个元素都会执行这个函数。其中函数参数：

- currentValue：必须。当前元素的的值。
- index：可选。当前元素的索引。
- arr：可选。当前元素属于的数组对象。

2. filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素。

```JS
let array = [1, 2, 3]
let newArray = array.filter(val => val !== 2)
console.log(newArray) // [1, 3]
```

和 map 一样，filter 的回调函数也接受三个参数，用处也相同。

3.forEach 方法用于调用数组的每个元素，并将元素传递给回调函数。

语法：

```JS
array.forEach(function(currentValue, index, arr), thisValue)
```

- currentValue：必塡，当前元素。
- index：可选，当前元素的索引。
- arr：可选，当前元素所属的数组对象。
- thisValue：可选，传递给函数的值一般用this值，如果这个参数为空，"undefined"会传递给"this"值。（这个参数一般很少塡）

```JS
[1, 2, 3].forEach(item => console.log(item + 1)) //2,3,4
```

最后我们来讲解 reduce 这块的内容，同时也是最难理解的一块内容。reduce 可以将数组中的元素通过回调函数最终转换为一个值。

如果我们想实现一个功能将函数里的元素全部相加得到一个值，可能会这样写代码。

```JS
const arr = [1, 2, 3]
let total = 0
for (let i = 0; i < arr.length; i++) {
  total += arr[i]
}
console.log(total) //6 
```

但是如果我们使用 reduce 的话就可以将遍历部分的代码优化为一行代码。

```JS
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)
```
对于 reduce 来说，它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 reduce 的过程

- 首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入
- 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
- 在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入
- 所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 6

想必通过以上的解析大家应该明白 reduce 是如何通过回调函数将所有元素最终转换为一个值的，当然 reduce 还可以实现很多功能，接下来我们就通过 reduce 来实现 map 函数

（当然我们可以通过for循环来实现filter和map函数，这里就不再赘述，下面我们用reduce实现。）

```js
const mapArray = [1, 2, 3].map(val => val * 2)
const reduceArray = arr.reduce((total, curr) => {
  total.push(curr * 2)
  return total
}, [])
console.log(mapArray, reduceArray) // [2, 4, 6]
```

当然filter函数也按道理可得：

```JS
const arr = [1, 2, 3]
const filterArray = arr.filter(value => value !== 2)
const reduceArray = arr.reduce((total, curr) => {
  if(curr !== 2) {
  total.push(curr)
  }
  return total
}, [])
console.log(filterArray , reduceArray) // [1, 3]