
这个星期都很忙，从早忙到晚，往往回到家已经快11点了。。。
在负责的一个vue项目中，遇到antd-table的小坑，笔记。
需求：页面里有个table，点击编辑可以编辑该table，保存数据并展示到页面上来

<!-- more -->

第一种方法就是把编辑态的table做成子组件（且叫editeTable），通过v-show判断是否进入编辑态来显示隐藏。先仿造原本父组件（且叫fatherTable），做了一些基本的table样式，子组件editeTable里的tr每格皆为antd-Form表单输入框，接收fatherTable的data数据，用Form的API——validateFields校验并获取输入域的值，进行编辑，用户编辑完后，点保存，然后editeTable里的数据通过$emit函数showPage()传递给fatherTable，覆盖掉fatherTable原本的data数据，这样即可实现。以下为部分代码(不全)：

```JS
// 父组件中引用
 <test-edit
        v-show="this.editeType"
        :editeData="entityinfo"
        :editeType="editeType"
        @showPage="editeShow">
 </test-edit>

// 子组件js    
 export default {
  props: {
    editeData: Object,
    editeType: Boolean
  },     
 mounted() {
    this.initDate();
  },
 watch: {
    editeType: function() {
      // console.log(this.editeType);
      if(this.editeType){
       setTimeout(()=>{
         this.initDate();
       },200)
         // this.initDate();
        // console.log(111,this.editeData)
      }
     else {
      this.form.setFieldsValue(this.entityinfo);
    }
  },
 methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        // console.log('error', error);
        // console.log('Received values of form: ', values);
        // console.log(values);
        this.$emit('showPage', values)
      });
      this.from.validateFields();
    }
 }
```

另一种方法是用antd-table自带的编辑edite功能，这个功能可以实现对每一行的数据进行定点编辑，但是遇到一个坑，如果我编辑态也是做成一个子组件的话，就需要先在子组件通过props取到父组件传来的值data，但我们都知道子组件是没有权利更改父组件传过来的值，这时候我们需要定义一个新的变量newdata，通过深拷贝data给newdata赋值，但细看antd文档就知道，antd-table里的数据需要每一条数据都有一个属于自己的key值，然后我们的data并没有key值，此时就需要遍历newdata，给每个对象就push一个key值。然后在newdata上进行操作。

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