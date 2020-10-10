### TS 开发知识点记录

#### 一、xxxx.d.ts || xxxx.ts 声明文件

> TypeScript 的设计目标之一是让你在 TypeScript 中安全、轻松地使用现有的 JavaScript 库，TypeScript 通过声明文件来做到这一点

**声明文件的定义：**
通过 declare 关键字来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码。环境声明就好像你与编译器之间的一个约定，是一个文档。

**声明文件的特点：**
   1、如果一个声明文件的顶层作用域中有 import || export，那么这个声明文件就是一个模块类声明文件，不会在全局生效，需要按模块的方式导出；
   2、声明文件头部没有任何import与export，声明文件才能全局生效

#### 二、类型断言

```js
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = "hello"; // Error: 'bas' 属性不存在于 '{}'
```

这里的代码发出了错误警告，因为 foo 的类型推断为 {}，即是具有零属性的对象。因此，你不能在它的属性上添加 bar 或 bas，你可以通过类型断言来避免此问题：

```JS
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

最初的断言语法如下所示：

```JS
let foo: any;
let bar = <string>foo; // 现在 bar 的类型是 'string'
```

#### 三、interface VS type

**相同点：**
    1. 都允许拓展（extends）
    2. 都可以描述一个对象或者函数
**不同点：**
    1. type 可以声明基本类型别名，联合类型，元组等类型

    ```JS
    // 基本类型别名
    type Name = string
    // 联合类型
    interface Dog {
       wong();
    }
    interface Cat {
       miao();
    }
    type Pet = Dog | Cat
    // 具体定义数组每个位置的类型
    type PetList = [Dog, Pet]

    ```

    1. type 语句中还可以使用 typeof 获取实例的 类型进行赋值
    2. interface 能够声明合并

    ```JS
    interface User {
    name: string
    age: number
    }

    interface User {
     sex: string
    }

    /*
    User 接口为 {
     name: string
     age: number
     sex: string
    }
    */
    ```

#### 四、interface定义数组，数组的项为对象
```JS
interface objData {
    a: number,
    b: any,
}
// 定义一个普通的对象
const obj: objData;
// 定义一个包含对象的数组
const arr: objData[];


// 如果objData中的a类型需要变为string，则ts需要类型兼容
interface objData<T> {
    a: T,
    b: any,
}
const obj: objData<string>;
const arr: objData<string>[];
```
