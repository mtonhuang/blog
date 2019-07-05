这个星期都很忙，从早忙到晚，往往回到家已经快11点了。。。
在负责的一个vue项目中，遇到antd-table的小坑，笔记。
需求：页面里有个table，点击编辑可以编辑该table，保存数据并展示到页面上来

<!-- more -->

接到这个需求的时候，第一想法就是把编辑态的table做成子组件（且叫editeTable），通过v-show判断是否进入编辑态来显示隐藏，于是，先仿造原本父组件（且叫fatherTable），做了一些基本的table样式，但editeTable里的tr每格都是input框，即可进行编辑，用户编辑完后，点保存，则把editeTable里的数据通过$emit函数传递给fatherTable，覆盖掉fatherTable原本的data数据，这样即可实现。

另一种方法是用antd-table自带的编辑edite功能，这个功能可以实现对每一行的数据进行定点编辑，但是遇到一个坑，如果我编辑态也是做成一个子组件的话，就需要先在子组件通过props取到父组件传来的值data，并且定义一个新的变量newdata，通过深拷贝data给newdata赋值，但细看文档就知道，antd-table里的数据需要每一条数据都有一个属于自己的key值，但data并没有key值，此时就需要遍历newdata，给每个对象就push一个key值。

```js
 this.newData = [...this.data] || [];
      this.newData.forEach((item,index) => {
        item.key = index;
      }
```
而且要注意一点就是，antd-table的dataIndex和scopedSlots必须为同名，否则不生效，这是第二个坑，所以newdata在初始化数据要注意。之后编辑获取到新的newdata，便可以通过$emit给父组件传值，得到编辑后的效果。

以下为antd-table的部分实例代码： 
```js
const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
```


