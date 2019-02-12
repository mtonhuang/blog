# ESLint 补充
[TOC]

### no-duplicate-imports

> 禁止重复模块导入

**Rule Details**

该规则要求单个模块的所有的导入都在同一个 import 语句中。


**错误** 代码示例：
```
/*eslint no-duplicate-imports: "error"*/

import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```
**正确** 代码示例：

```
/*eslint no-duplicate-imports: "error"*/

import { merge, find } from 'module';
import something from 'another-module';
```

**Options**

该规则有一个对象选项，只有一个布尔属性 includeExports。默认为 false。

如果一个导入的模块又被导出，你应该把这些导入加到 import 语句中，然后直接导出，不要使用 export ... from。

选项 { "includeExports": true } 的 **错误** 代码示例：

```
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge } from 'module';

export { find } from 'module';
```
选项 { "includeExports": true } 的 **正确** 代码示例：

```
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge, find } from 'module';

export { find };
```


### no-useless-constructor

> 禁用不必要的构造函数

**Rule Details**

该规则标记可以被安全移除但又不改变类的行为的构造函数。


**错误** 代码示例：
```
/*eslint no-useless-constructor: "error"*/
/*eslint-env es6*/

class A {
    constructor () {
    }
}

class A extends B {
    constructor (...args) {
      super(...args);
    }
}
```
**正确** 代码示例：

```
/*eslint no-useless-constructor: "error"*/

class A { }

class A {
    constructor () {
        doSomething();
    }
}

class A extends B {
    constructor() {
        super('foo');
    }
}

class A extends B {
    constructor() {
        super();
        doSomething();
    }
}
```

### no-var

> 要求使用 let 或 const 而不是 var

**Rule Details**

该规则旨在阻止 var 的使用，推荐使用 const 或 let。


**错误** 代码示例：
```
/*eslint no-var: "error"*/

var x = "y";
var CONFIG = {};
```
**正确** 代码示例：

```
/*eslint no-var: "error"*/
/*eslint-env es6*/

let x = "y";
const CONFIG = {};
```

### camelcase

> 强制使用骆驼拼写法命名约定

**Rule Details**

此规则在源码中查找下划线 (_)。它忽略前导和尾部的下划线，只检查在变量名称中间的下划线。如果 ESLint 判断定某个变量是个常量（全部大写），将不会发出警告。否则会发出警告。该规则仅仅标记定义和赋值，不适用于方法调用。在 ES6 import 语句中，该规则只针对将引入到本地模块作用域的变量名。

**Options**

该规则有一个对象选项：

- "properties": "always" (默认) 强制属性名称为驼峰风格
- "properties": "never" 不检查属性名称

**always**

默认选项 { "properties": "always" } 的**错误** 代码示例：
```
/*eslint camelcase: "error"*/

import { no_camelcased } from "external-module"

var my_favorite_color = "#112C85";

function do_something() {
    // ...
}

obj.do_something = function() {
    // ...
};

function foo({ no_camelcased }) {
    // ...
};

function foo({ isCamelcased: no_camelcased }) {
    // ...
}

function foo({ no_camelcased = 'default value' }) {
    // ...
};

var obj = {
    my_pref: 1
};

var { category_id = 1 } = query;

var { foo: no_camelcased } = bar;

var { foo: bar_baz = 1 } = quz;
```
默认选项 { "properties": "always" } 的 **正确** 代码示例：

```
/*eslint camelcase: "error"*/

import { no_camelcased as camelCased } from "external-module";

var myFavoriteColor   = "#112C85";
var _myFavoriteColor  = "#112C85";
var myFavoriteColor_  = "#112C85";
var MY_FAVORITE_COLOR = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };

obj.do_something();
do_something();
new do_something();

var { category_id: category } = query;

function foo({ isCamelCased }) {
    // ...
};

function foo({ isCamelCased: isAlsoCamelCased }) {
    // ...
}

function foo({ isCamelCased = 'default value' }) {
    // ...
};

var { categoryId = 1 } = query;

var { foo: isCamelCased } = bar;

var { foo: isCamelCased = 1 } = quz;

```

**never**

选项 { "properties": "never" } 的 **正确** 代码示例：

```
/*eslint camelcase: ["error", {properties: "never"}]*/

var obj = {
    my_pref: 1
};
```

### comma-dangle

> 要求或禁止末尾逗号

**Rule Details**

这个规则强制在对象和数组字面量中使用一致的拖尾逗号。

**Options**

该规则有一个字符串选项或一个对象选项：

```
{
    "comma-dangle": ["error", "never"],
    // or
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
    }]
}
```

- "never" (默认) 禁用拖尾逗号
- "always" 要求使用拖尾逗号
- "always-multiline" 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗- 号；当在 同一行时，禁止使用拖尾逗号。
- "only-multiline" 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）- 使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。

从ECMAScript 2017开始，拖尾逗号在函数声明和函数调用中是有效的语法；然而，字符串选项不会检查这种情况以向后兼容。

你也可以使用一个对象选项针对每种类型的语法来配置该规则规则。

以下每个选项可以设置为 "never"、"always"、"always-multiline"、"only-multiline" 或 "ignore"。

每个选项默认为 "never"，除非额外指定。

- arrays 针对数组字面量和解构赋值的数组模式。(比如 let [a,] = [1,];)
- objects 针对对象字面量和解构赋值的对象模式。(比如 let {a,} = {a: 1};)
- imports 针对 ES 模块的 import 声明。 (比如 import {a,} from "foo";)
- exports 针对 ES 模块的 export 声明。 (比如 export {a,};)
- functions 针对函数声明和函数调用。 (比如 (function(a,){ })(b,);)

functions 默认设置为 "ignore" 以与字符串选项保持一致。

**never**

默认选项 "never" 的 **错误** 代码示例：
```
/*eslint comma-dangle: ["error", "never"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```
默认选项 "never" 的 **正确** 代码示例：
```
/*eslint comma-dangle: ["error", "never"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```
**always**

选项 "always" 的 **错误** 代码示例：
```
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```
选项 "always" 的 **正确** 代码示例：

```

/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```
**always-multiline**

选项 "always-multiline" 的 **错误** 代码示例：
```
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux"
});
```
选项 "always-multiline" 的 **正确** 代码示例：

```
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

foo({
  bar: "baz",
  qux: "quux",
});
```
**only-multiline**

选项 "only-multiline" 的 **错误** 代码示例：

```
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];
```
选项 "only-multiline" 的 **正确** 代码示例：
```
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux",
});

foo({
  bar: "baz",
  qux: "quux"
});
```
**functions**

选项 {"functions": "never"} 的 **错误** 代码示例：
```
/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```
选项 {"functions": "never"} 的 **正确** 代码示例：
```

/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```
选项 {"functions": "always"} 的 **错误** 代码示例：
```

/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```
选项 {"functions": "always"} 的 **正确** 代码示例：
```

/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```

### computed-property-spacing

> 强制在计算的属性的方括号中使用一致的空格

**Rule Details**

该规则旨在保持计算属性内空格的一致性。

它要求或禁止括号和其内部值之间的空格。括号内相邻的值出现折行的情况，不适用于此规则。


**Options**

该规则有一个字符串选项：

- "never" (默认) 禁止在计算属性内使用空格
- "always" 要求在计算属性内使用一个或多个空格
**never**

默认选项 "never" 的 **错误** 代码示例：
```
/*eslint computed-property-spacing: ["error", "never"]*/
/*eslint-env es6*/

obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]
```
默认选项 "never" 的 **正确** 代码示例：
```
/*eslint computed-property-spacing: ["error", "never"]*/
/*eslint-env es6*/

obj[foo]
obj['foo']
var x = {[b]: a}
obj[foo[bar]]
```
**always**

选项 "always" 的 **错误** 代码示例：
```
/*eslint computed-property-spacing: ["error", "always"]*/
/*eslint-env es6*/

obj[foo]
var x = {[b]: a}
obj[ foo]
obj['foo' ]
obj[foo[ bar ]]
var x = {[ b]: a}
```
选项 "always" 的 **正确** 代码示例：
```
/*eslint computed-property-spacing: ["error", "always"]*/
/*eslint-env es6*/

obj[ foo ]
obj[ 'foo' ]
var x = {[ b ]: a}
obj[ foo[ bar ] ]
```

### consistent-this

> 当获取当前执行环境的上下文时，强制使用一致的命名

**Rule Details**

该规则指定一个变量作为 this 的别名。它将强制两件事情：

- 如果一个变量声明为一个指定的名称，它 必须 初始化（在声明语句中）或被赋值（与声明语句在同一范围内）为 this。
- 如果一个变量初始化或被赋值为 this，那么该变量 必须 是指定的别名。


**Options**

该规则有一个到两个字符串选项：

- 为 this 指定别名 (默认 "that")


默认选项 "that" 的 **错误** 代码示例：
```
/*eslint consistent-this: ["error", "that"]*/

var that = 42;

var self = this;

that = 42;

self = this;
```
默认选项 "that" 的 **正确** 代码示例：
```
/*eslint consistent-this: ["error", "that"]*/

var that = this;

var self = 42;

var self;

that = this;

foo.bar = this;
```
如果指定的变量没有初始化，默认选项 "that" 的 **错误** 代码示例：
```
/*eslint consistent-this: ["error", "that"]*/

var that;
function f() {
    that = this;
}
```
如果指定的变量没有初始化，默认选项 "that" 的 **正确** 代码示例：
```
/*eslint consistent-this: ["error", "that"]*/

var that;
that = this;

var foo, that;
foo = 42;
that = this;
```

### func-call-spacing

> 要求或禁止在函数标识符和其调用之间有空格

**Rule Details**

该规则要求或禁止在函数名和开括号之间有空格。

**options**

该规则有一个字符串选项：

- "never" (默认) 禁止在函数名和开括号之间有空格
- "always" 要求在函数名和开括号之间有空格


未来，在 "always" 模式中，可以有第二个选项，是个对象，包含一个布尔类型的 allowNewlines 属性。

**never**

默认选项 "never" 的 **错误** 代码示例：
```
/*eslint func-call-spacing: ["error", "never"]*/

fn ();

fn
();
```
默认选项 "never" 的 **正确** 代码示例：
```
/*eslint func-call-spacing: ["error", "never"]*/

fn();
```
**always**

选项 "always" 的 **错误** 代码示例：
```
/*eslint func-call-spacing: ["error", "always"]*/

fn();

fn
();
```
选项 "always" 的 **正确** 代码示例：
```
/*eslint func-call-spacing: ["error", "always"]*/

fn ();
```
**allowNewlines**

默认情况下，"always" 不允许换行。在 "always" 模式中，设置 allowNewlines 选项为 true 来允许换行。换行从来就不是必须的。

选项 { "allowNewlines": true } 的 **错误** 代码示例：
```
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn();
```
选项 { "allowNewlines": true } 的 **正确** 代码示例：
```
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn (); // Newlines are never required.

fn
();
```
### indent

> 强制使用一致的缩进

**Rule Details**

该规则旨在强制使用一致的缩进风格。默认是 4个空格。

**Options**

该规则有一个混合选项：

例如，2 个空格缩进：
```
{
    "indent": ["error", 2]
}
```
或 tab 缩进：
```
{
    "indent": ["error", "tab"]
}
```
默认选项的 错误 代码示例：
```
/*eslint indent: "error"*/

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
```
默认选项的 正确 代码示例：
```
/*eslint indent: "error"*/

if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```
该规则有一个对象选项：

- "SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进级别
- "VariableDeclarator" (默认：1) 强制 var 声明的缩进级别；也可以使用一个对象为 var、let 和 const 声明分别定义。
- "outerIIFEBody" (默认: 1) 强制文件级别的 IIFE 的缩进
- "MemberExpression" (默认: 1) 强制多行属性链的缩进 (除了在变量声明和赋值语句中)也可以设置为 "off" 以禁止检查成员表达式的缩进。
- "FunctionDeclaration" 使用一个对象定义函数声明的缩进规则。
- parameters (默认: 1) 强制函数声明中参数的缩进。可以是一个数字来表示缩进级别，或字符串 "first" 表示声明中的所有参数必须与第一个参数对齐。也可以设置为 "off" 以禁止检查函数声明的参数的缩进。
- body (默认: 1) 强制函数声明的函数体的缩进级别。
- "FunctionExpression" 使用一个对象定义函数表达式的缩进规则。
- parameters (默认: 1) 强制函数表达式中参数的缩进。可以是一个数字来表示缩进级别，或字符串 "first" 表示表达式中的所有参数必须与第一个参数对齐。也可以设置为 "off" 以禁止检查函数表达式的参数的缩进。
- body (默认: 1) 强制函数表达式的函数体的缩进级别。
- "CallExpression" 使用一个对象定义函数调用表达式的缩进规则。
- arguments (默认: 1) 强制函数调用表达式中参数的缩进。可以是一个数字来表示缩进级别，或字符串 "first" 表示表达式中的所有参数必须先与第一个参数对齐。也可以设置为 "off" 以禁止检查函数调用的参数的缩进。
- "ArrayExpression" (默认: 1) 强制数组中的元素的缩进。可以是一个数字来表示缩进级别，或字符串 "first" 表示数组中的所有元素必须与第一个元素对齐。也可以设置为 "off" 以禁止检查数组元素的缩进。
- "ObjectExpression" (默认: 1) 强制对象中的属性的缩进。可以是一个数字来表示缩进级别，或字符串 "first" 表示对象中的所有属性必须与第一个属性对齐。也可以设置为 "off" 以禁止检查对象属性的缩进。
- "ImportDeclaration" (默认: 1) 强制 import 语句的缩进。可以设置为 "first"，表示从一个模块中导入的成员要与第一个成员对齐。也可以设置为 "off" 以禁止检查导入的模块成员的缩进。
- "flatTernaryExpressions": true (默认 false) 要求三元表达式内的三元表达式不能有缩进。
- "ignoredNodes" 接受一组 selectors。如果任何选择器匹配了一个 AST 节点，其子节点的 token 的缩进将被忽略。如果你不同意它为特定的语法模式强制执行缩进，可以将此选项作为规避该规则的选项。
- "ignoreComments" (默认: false) 当主食不需要与前一行或下一行的注释对齐，可以使用此选项。


缩进级别表示指定的多个缩进。例如：

- 如果缩进设置为 4 个空格，VariableDeclarator 设置为 2，多行变量声明将会缩进 8 个空格。
- 如果缩进设置为 2 个空格，VariableDeclarator 设置为 2，多行变量声明将会缩进 4 个空格。
- 如果缩进设置为 2 个空格，VariableDeclarator 设置为 {"var": 2, "let": 2, "const": 3}，多行变量声明将会分别为 var 和 let 语句缩进 4 个空格，const 语句缩进 6 个空格语句。
- 如果缩进设置为 tab 缩进，VariableDeclarator 设置为 2，多行变量声明将会缩进 2 个 tab。
- 如果缩进设置为 2 个空格，SwitchCase 设置为 0，case将不会缩进。
- 如果缩进设置为 2 个空格，SwitchCase 设置为 1，case 子句将相对于 switch 语句缩进 2 个空格。
- 如果缩进设置为 2 个空格，SwitchCase 设置为 2，case 子句将相对于 switch 语句缩进 4 个空格。
- 如果缩进设置为 tab 缩进，SwitchCase 设置为 2，case 子句将相对于 switch 语句缩进 2 个 tab。
- 如果缩进设置为 2 个空格， MemberExpression 设置为 0，多行属性将不对缩进。
- 如果缩进设置为 2 个空格， MemberExpression 设置为 1，多行属性将缩进 2 个空格。
- 如果缩进设置为 2 个空格， MemberExpression 设置为 2，多行属性将缩进 4 个空格。
- 如果缩进设置为 4 个空格， MemberExpression 设置为 0，多行属性将不会缩进。
- 如果缩进设置为 4 个空格， MemberExpression 设置为 1，多行属性将将缩进 4 个空格。
- 如果缩进设置为 4 个空格， MemberExpression 设置为 2，多行属性将将缩进 8 个空格。


**tab**

选项 "tab" 的 **错误** 代码示例：
```
/*eslint indent: ["error", "tab"]*/

if (a) {
     b=c;
function foo(d) {
           e=f;
 }
}
```
选项 "tab" 的 **正确** 代码示例：
```
/*eslint indent: ["error", "tab"]*/

if (a) {
/*tab*/b=c;
/*tab*/function foo(d) {
/*tab*//*tab*/e=f;
/*tab*/}
}
```
**SwitchCase**

选项 2, { "SwitchCase": 1 } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
case "a":
    break;
case "b":
    break;
}
```
选项 2, { "SwitchCase": 1 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
  case "a":
    break;
  case "b":
    break;
}
```
**VariableDeclarator**

选项 2, { "VariableDeclarator": 1 } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
    b = 2,
    c = 3;
```
选项 2, { "VariableDeclarator": 1 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/
/*eslint-env es6*/

var a,
  b,
  c;
let a,
  b,
  c;
const a = 1,
  b = 2,
  c = 3;
```
选项 2, { "VariableDeclarator": 2 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "VariableDeclarator": 2 }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
    b = 2,
    c = 3;
```
选项 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }]*/
/*eslint-env es6*/

var a,
    b,
    c;
let a,
    b,
    c;
const a = 1,
      b = 2,
      c = 3;
```
**outerIIFEBody**

选项 2, { "outerIIFEBody": 0 } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

  function foo(x) {
    return x + 1;
  }

})();


if(y) {
console.log('foo');
}
```
选项 2, {"outerIIFEBody": 0} 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();


if(y) {
   console.log('foo');
}
```
**MemberExpression**
```
选项 2, { "MemberExpression": 1 } 的 **错误** 代码示例：

/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
.bar
.baz()
```
选项 2, { "MemberExpression": 1 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
  .bar
  .baz();

// Any indentation is permitted in variable declarations and assignments.
var bip = aardvark.badger
                  .coyote;
```
**FunctionDeclaration**

选项 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
  baz,
  qux) {
    qux();
}
```
选项 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
    baz,
    qux) {
  qux();
}
```
选项 2, { "FunctionDeclaration": {"parameters": "first"} } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
  qux, boop) {
  qux();
}
```
选项 2, { "FunctionDeclaration": {"parameters": "first"} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
             qux, boop) {
  qux();
}
```
**FunctionExpression**

选项 2, { "FunctionExpression": {"body": 1, "parameters": 2} } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
  baz,
  qux) {
    qux();
}
```
选项 2, { "FunctionExpression": {"body": 1, "parameters": 2} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
    baz,
    qux) {
  qux();
}
```
选项 2, { "FunctionExpression": {"parameters": "first"} } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
  qux, boop) {
  qux();
}
```
选项 2, { "FunctionExpression": {"parameters": "first"} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
                   qux, boop) {
  qux();
}
```
**CallExpression**

选项 2, { "CallExpression": {"arguments": 1} } 的 错误 代码示例：
```
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
    baz,
      qux
);
```
选项 2, { "CallExpression": {"arguments": 1} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
  baz,
  qux
);
```
选项 2, { "CallExpression": {"arguments": "first"} } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
  baz, boop, beep);
```
选项 2, { "CallExpression": {"arguments": "first"} } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
    baz, boop, beep);
```
**ArrayExpression**

选项 2, { "ArrayExpression": 1 } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
    bar,
baz,
      qux
];
```
选项 2, { "ArrayExpression": 1 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
  bar,
  baz,
  qux
];
```
选项 2, { "ArrayExpression": "first" } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
  baz,
  qux
];
```
选项 2, { "ArrayExpression": "first" } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
           baz,
           qux
];
```
**ObjectExpression**

选项 2, { "ObjectExpression": 1 } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```
选项 2, { "ObjectExpression": 1 } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```
选项 2, { "ObjectExpression": "first" } 的 **错误** 代码示例：
```
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
  baz: 2 };
```
选项 2, { "ObjectExpression": "first" } 的 **正确** 代码示例：
```
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
            baz: 2 };
```
**ImportDeclaration**
```
/*eslint indent: ["error", 4, { ImportDeclaration: 1 }]*/

import { foo,
    bar,
    baz,
} from 'qux';

import {
    foo,
    bar,
    baz,
} from 'qux';
```
Examples of incorrect code for this rule with the 4, { ImportDeclaration: "first" } option:
```
/*eslint indent: ["error", 4, { ImportDeclaration: "first" }]*/

import { foo,
    bar,
    baz,
} from 'qux';
/*eslint indent: ["error", 4, { ImportDeclaration: "first" }]*/

import { foo,
         bar,
         baz,
} from 'qux';
```
**flatTernaryExpressions**

Examples of incorrect code for this rule with the default 4, { "flatTernaryExpressions": false } option:
```
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```
Examples of incorrect code for this rule with the 4, { "flatTernaryExpressions": true } option:
```
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```
**ignoredNodes**

The following configuration ignores the indentation of ConditionalExpression (“ternary expression”) nodes:
```
/*eslint indent: ["error", 4, { "ignoredNodes": ["ConditionalExpression"] }]*/

var a = foo
      ? bar
      : baz;

var a = foo
                ? bar
: baz;
```
The following configuration ignores indentation in the body of IIFEs.
```
/*eslint indent: ["error", 4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }]*/

(function() {

foo();
bar();

})
```
**ignoreComments**

Examples of additional correct code for this rule with the 4, { "ignoreComments": true } option:

```
/*eslint indent: ["error", 4, { "ignoreComments": true }] */

if (foo) {
    doSomething();

// comment intentionally de-indented
    doSomethingElse();
}
```

### quotes

> 强制使用一致的反勾号、双引号或单引号

**Rule Details**

该规则强制使用一致的反勾号、双引号或单引号。

**Options**

该规则有两个选项，一个是字符串，一个是对象。

字符串选项：

- "double" (默认) 要求尽可能地使用双引号
- "single" 要求尽可能地使用单引号
- "backtick" 要求尽可能地使用反勾号


对象选项：

- "avoidEscape": true 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
- "allowTemplateLiterals": true 允许字符串使用反勾号
弃用：avoid-escape选项已被弃用；请使用 avoidEscape。

**double**

默认选项 "double" 的 **错误** 代码示例：
```
/*eslint quotes: ["error", "double"]*/

var single = 'single';
var unescaped = 'a string containing "double" quotes';
var backtick = `back\ntick`; // you can use \n in single or double quoted strings
```
默认选项 "double" 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/

var double = "double";
var backtick = `back
tick`;  // backticks are allowed due to newline
var backtick = tag`backtick`; // backticks are allowed due to tag
```
**single**
选项 "single" 的 **错误** 代码示例：
```
/*eslint quotes: ["error", "single"]*/

var double = "double";
var unescaped = "a string containing 'single' quotes";
```
选项 "single" 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "single"]*/
/*eslint-env es6*/

var single = 'single';
var backtick = `back${x}tick`; // backticks are allowed due to substitution
```
**backticks**

选项 "backtick" 的 **错误** 代码示例：
```
/*eslint quotes: ["error", "backtick"]*/

var single = 'single';
var double = "double";
var unescaped = 'a string containing `backticks`';
```
选项 "backtick" 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/

var backtick = `backtick`;
```
**avoidEscape**

选项呢 "double", { "avoidEscape": true } 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/

var single = 'a string containing "double" quotes';
```
选项 "single", { "avoidEscape": true } 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

var double = "a string containing 'single' quotes";
```
选项 "backtick", { "avoidEscape": true } 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "backtick", { "avoidEscape": true }]*/

var double = "a string containing `backtick` quotes"
```
**allowTemplateLiterals**

选项 "double", { "allowTemplateLiterals": true } 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "double", { "allowTemplateLiterals": true }]*/

var double = "double";
var double = `double`;
```
选项 "single", { "allowTemplateLiterals": true } 的 **正确** 代码示例：
```
/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/

var single = 'single';
var single = `single`;
```

### space-infix-ops

> 要求操作符周围有空格

**Rule Details**

此规则旨在确保中缀运算符周围有空格。

**Options**

该规则接收唯一一个可选项参数，具有以下默认值：
```
"space-infix-ops": ["error", {"int32Hint": false}]
```
**int32Hint**

设置 int32Hint 选项为 true (默认 false) 允许 a|0 不带空格.
```
var foo = bar|0; // `foo` is forced to be signed 32 bit integer
```
**错误** 代码示例：
```
/*eslint space-infix-ops: "error"*/
/*eslint-env es6*/

a+b

a+ b

a +b

a?b:c

const a={b:1};

var {a=0}=bar;

function foo(a=0) { }
```
**正确** 代码示例：
```
/*eslint space-infix-ops: "error"*/
/*eslint-env es6*/

a + b

a       + b

a ? b : c

const a = {b:1};

var {a = 0} = bar;

function foo(a = 0) { }
```

### space-unary-ops

> 强制在一元操作符前后使用一致的空格

**Rule Details**

该规则强制 words 一元操作符后空格和 nonwords 一元操作符之前或之后的空格的一致性。

一元 words 操作符的例子：
```
// new
var joe = new Person();

// delete
var obj = {
    foo: 'bar'
};
delete obj.foo;

// typeof
typeof {} // object

// void
void 0 // undefined
```
一元 nonwords 操作符的例子：
```
if ([1,2,3].indexOf(1) !== -1) {};
foo = --foo;
bar = bar++;
baz = !foo;
qux = !!baz;
```
**Options**

该规则有三个可选项：

- words - 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
- nonwords - 适用于这些一元操作符: -、+、--、++、!、!!
- overrides - 覆盖操作符周围空格的用法。默认为空，但可用来强制或禁止操作符周围有空格。例如：

```
    "space-unary-ops": [
        2, {
          "words": true,
          "nonwords": false,
          "overrides": {
            "new": false,
            "++": true
          }
    }]
```
在这个例子中，new 操作符之后禁用空格，++ 操作左右要求有空格。

选项 {"words": true, "nonwords": false} 的 **错误** 代码示例：
```
/*eslint space-unary-ops: "error"*/

typeof!foo;

void{foo:0};

new[foo][0];

delete(foo.bar);

++ foo;

foo --;

- foo;

+ "3";
/*eslint space-unary-ops: "error"*/
/*eslint-env es6*/

function *foo() {
    yield(0)
}
/*eslint space-unary-ops: "error"*/

async function foo() {
    await(bar);
}
```
选项 {"words": true, "nonwords": false} 的 **正确** 代码示例：
```
/*eslint space-unary-ops: "error"*/

// Word unary operator "delete" is followed by a whitespace.
delete foo.bar;

// Word unary operator "new" is followed by a whitespace.
new Foo;

// Word unary operator "void" is followed by a whitespace.
void 0;

// Unary operator "++" is not followed by whitespace.
++foo;

// Unary operator "--" is not preceded by whitespace.
foo--;

// Unary operator "-" is not followed by whitespace.
-foo;

// Unary operator "+" is not followed by whitespace.
+"3";
/*eslint space-unary-ops: "error"*/
/*eslint-env es6*/

function *foo() {
    yield (0)
}
/*eslint space-unary-ops: "error"*/

async function foo() {
    await (bar);
}
```
### brace-style

> 强制在代码块中使用一致的大括号风格

**Rule Details**

该规则旨在强制在Javascript中使用特定的括号风格。因此，如果某条语句或声明没有遵守该该风格，该规则将发出警告。

**Options**

该规则有一个字符串选项：

- "1tbs" (默认) 强制 one true brace style
- "stroustrup" 强制 Stroustrup style
- "allman" 强制 Allman style

该规则可以有例外情况，用对象表示：

"allowSingleLine": true (默认 false) 允许块的开括号和闭括号在 同一行

**1tbs**

选项"1tbs"的 **错误** 代码示例：
```
/*eslint brace-style: "error"*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
}
else {
  baz();
}
```
选项"1tbs"的 **正确** 代码示例：
```
/*eslint brace-style: "error"*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
} else {
  baz();
}

try {
  somethingRisky();
} catch(e) {
  handleError();
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```
选项"1tbs", { "allowSingleLine": true }的 **正确** 代码示例：
```
/*eslint brace-style: ["error", "1tbs", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); } else { baz(); }

try { somethingRisky(); } catch(e) { handleError(); }
```
**stroustrup**

选项"stroustrup"的 **错误** 代码示例：
```
/*eslint brace-style: ["error", "stroustrup"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
} else {
  baz();
}
```
选项"stroustrup"的 **正确** 代码示例：
```
/*eslint brace-style: ["error", "stroustrup"]*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
}
else {
  baz();
}

try {
  somethingRisky();
}
catch(e) {
  handleError();
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```
选项"stroustrup", { "allowSingleLine": true }的 **正确** 代码示例：
```
/*eslint brace-style: ["error", "stroustrup", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }
```
**allman**

选项"allman"的 **错误** 代码示例：
```
/*eslint brace-style: ["error", "allman"]*/

function foo() {
  return true;
}

if (foo)
{
  bar(); }

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
} else {
  baz();
}
```
选项"allman"的 **正确** 代码示例：
```
/*eslint brace-style: ["error", "allman"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

if (foo)
{
  bar();
}
else
{
  baz();
}

try
{
  somethingRisky();
}
catch(e)
{
  handleError();
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```
选项"allman", { "allowSingleLine": true }的 **正确** 代码示例：
```
/*eslint brace-style: ["error", "allman", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }
```

### space-before-blocks

> 强制在块之前使用一致的空格

**Rule Details**

该规则将强制块之前的空格的一致性。它只在非行首的块上起作用。

- 该规则忽略 => 和块之间的空格。arrow-spacing 规则处理这些空格。
- 该规则忽略关键字和块之间的空格。keyword-spacing 规则处理这些空格。


**Options**

该规则有一个参数。如果为 "always"，块语句必须总是至少有一个前置空格。如果为"never"，所有的块永远不会有前置空格。如果函数块和关键字块要求不同的空格类型，可以单独传递一个可选配置的对象作为该规则的参数来配置这种情况。(比如：{ "functions": "never", "keywords": "always", classes: "always" } )

默认为 "always"。

**“always”**

选项 "always" 的 **错误** 代码示例：
```
/*eslint space-before-blocks: "error"*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try {} catch(a){}

class Foo{
  constructor(){}
}
```
选项 "always" 的 **正确** 代码示例：
```
/*eslint space-before-blocks: "error"*/

if (a) {
    b();
}

if (a) {
    b();
} else{ /*no error. this is checked by `keyword-spacing` rule.*/
    c();
}


function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```
**“never”**

选项 "never" 的 **错误** 代码示例：
```
/*eslint space-before-blocks: ["error", "never"]*/

if (a) {
    b();
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```
选项 "never" 的 **正确** 代码示例：
```
/*eslint space-before-blocks: ["error", "never"]*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try{} catch(a){}

class Foo{
  constructor(){}
}
```
选项 { "functions": "never", "keywords": "always", "classes": "never" } 的 **错误** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/
/*eslint-env es6*/

function a() {}

try {} catch(a){}

class Foo{
  constructor() {}
}
```
选项 { "functions": "never", "keywords": "always", "classes": "never" } 的 **正确** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/
/*eslint-env es6*/

for (;;) {
  // ...
}

describe(function(){
  // ...
});

class Foo {
  constructor(){}
}
```
选项 { "functions": "always", "keywords": "never", "classes": "never" } 的 **错误** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/
/*eslint-env es6*/

function a(){}

try {} catch(a) {}

class Foo {
  constructor(){}
}
```
选项 { "functions": "always", "keywords": "never", "classes": "never" } 的 **正确** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/
/*eslint-env es6*/

if (a){
  b();
}

var a = function() {}

class Foo{
  constructor() {}
}
```
选项 { "functions": "never", "keywords": "never", "classes": "always" } 的 **错误** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/
/*eslint-env es6*/

class Foo{
  constructor(){}
}
```
选项呢 { "functions": "never", "keywords": "never", "classes": "always" } 的 **正确** 代码示例：
```
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/
/*eslint-env es6*/

class Foo {
  constructor(){}
}
```

### keyword-spacing

> 强制在关键字前后使用一致的空格

**Rule Details**

该规则强制关键字和类似关键字的符号周围空格的一致性：as、async、await、break、case、catch、class、const、continue、debugger、default、delete、do、else、export、extends、finally、for、from、function、get、if、import、in、instanceof、let、new、of、return、set、static、super、switch、this、throw、try、typeof、var、void、while、with 和 yield。该规则不会与其它空格规则发生冲突：它并不应用于别的规则会报告问题的空格。

Options
该规则有一个对象选项：

- "before": true (默认) 要求在关键字之前至少有一个空格
- "before": false 禁止在关键字之前有空格
- "after": true (默认) 要求在关键字之后至少有一个空格
- "after": false 禁止在关键字之后有空格
- "overrides" 允许覆盖指定的关键字的空格风格


**before**

默认选项 { "before": true } 的 **错误** 代码示例：
```
/*eslint keyword-spacing: ["error", { "before": true }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```
默认选项 { "before": true } 的 **正确** 代码示例：
```
/*eslint keyword-spacing: ["error", { "before": true }]*/
/*eslint-env es6*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];
let b = [function() {}];

// Avoid conflict with `arrow-spacing`
let a = ()=> this.foo;

// Avoid conflict with `block-spacing`
{function foo() {}}

// Avoid conflict with `comma-spacing`
let a = [100,this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function *foo() {}

// Avoid conflict with `key-spacing`
let obj = {
    foo:function() {}
};

// Avoid conflict with `object-curly-spacing`
let obj = {foo: this};

// Avoid conflict with `semi-spacing`
let a = this;function foo() {}

// Avoid conflict with `space-in-parens`
(function () {})();

// Avoid conflict with `space-infix-ops`
if ("foo"in {foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `x-curly-spacing`
let a = <A foo={this.foo} bar={function(){}} />
```
选项 { "before": false } 的 **错误** 代码示例：
```
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```
选项 { "before": false } 的 **正确** 代码示例：
```
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```
**after**

默认选项 { "after": true } 的 **错误** 代码示例：
```
/*eslint keyword-spacing: ["error", { "after": true }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```
默认选项 { "after": true } 的 **正确** 代码示例：
```
/*eslint keyword-spacing: ["error", { "after": true }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];

// Avoid conflict with `arrow-spacing`
let a = ()=> this.foo;

// Avoid conflict with `comma-spacing`
let a = [100, this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function* foo() {}

// Avoid conflict with `key-spacing`
let obj = {
    foo:function() {}
};

// Avoid conflict with `func-call-spacing`
class A {
    constructor() {
        super();
    }
}

// Avoid conflict with `object-curly-spacing`
let obj = {foo: this};

// Avoid conflict with `semi-spacing`
let a = this;function foo() {}

// Avoid conflict with `space-before-function-paren`
function() {}

// Avoid conflict with `space-infix-ops`
if ("foo"in{foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `space-unary-ops`
function* foo(a) {
    return yield+a;
}

// Avoid conflict with `yield-star-spacing`
function* foo(a) {
    return yield* a;
}

// Avoid conflict with `x-curly-spacing`
let a = <A foo={this.foo} bar={function(){}} />
```
选项 { "after": false } 的 **错误** 代码示例：
```
/*eslint keyword-spacing: ["error", { "after": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```
选项 { "after": false } 的 **正确** 代码示例：
```
/*eslint keyword-spacing: ["error", { "after": false }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```
**overrides**

选项 { "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false } } } 的 **正确** 代码示例：
```
/*eslint keyword-spacing: ["error", { "overrides": {
  "if": { "after": false },
  "for": { "after": false },
  "while": { "after": false }
} }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else {
    //...
}

for(;;);

while(true) {
  //...
}
```

### key-spacing

> 强制在对象字面量的属性中键和值之间使用一致的间距

**Rule Details**

该规则强制在对象字面量的键和值之间使用一致的空格。如果某一行很长的话，在允许空白出现的情况下，可以增加一空行，这种情况是该规则可以接受的。

**Options**

该规则有一个对象选项：

- "beforeColon": false (默认) | true
- false: 禁止在对象字面量的键和冒号之间存在空格
- true: 要求在对象字面量的键和冒号之间存在至少有一个空格
- "afterColon": true (默认) | false
- true: 要求在对象字面量的冒号和值之间存在至少有一个空格
- false: 禁止在对象字面量的冒号和值之间存在空格
- "mode": "strict" (默认) | "minimum"
- "strict": 强制在冒号前后只有一个空格
- "minimum": 要求在冒号前后最少有一个空格
- "align": "value" | "colon"
- "value": 要求对象字面量中的值水平对齐
- "colon" 要求对象字面量中的冒号和值都水平对齐
- "align" 允许细粒度的控制对象字面量值的间距直到对齐
- "singleLine" 为单行对象字面量指定一个空格风格
- "multiLine" 为多行对象字面量指定一个空格风格


请注意，你可以使用顶级选项或分组选项 (singleLine 和 multiLine)，但不能同时使用两者。

**beforeColon**

默认选项 { "beforeColon": false } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo" : 42 };
```
默认选项 { "beforeColon": false } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo": 42 };
```
选项 { "beforeColon": true } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo": 42 };
```
选项 { "beforeColon": true } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo" : 42 };
```
**afterColon**

默认选项 { "afterColon": true } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo":42 };
```
默认选项 { "afterColon": true } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo": 42 };
```
选项 { "afterColon": false } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo": 42 };
```
选项 { "afterColon": false } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo":42 };
```
**mode**

默认选项 { "mode": "strict" } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

默认选项 { "mode": "strict" } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat: 2 * 2
});
```
选项 { "mode": "minimum" } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "mode": "minimum" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```
**align**

选项 { "align": "value" } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a: value,
    bcde:  42,
    fg :   foo()
};
```
选项 { "align": "value" } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a:    value,
    bcde: 42,

    fg: foo(),
    h:  function() {
        return this.a;
    },
    ijkl: 'Non-consecutive lines form a new group'
};

var obj = { a: "foo", longPropertyName: "bar" };
```
选项 { "align": "colon" } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```
选项 { "align": "colon" } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat   : 2 * 2
});
```
**align**

align 选项可以通过 beforeColon、afterColon、mode 和 on 进行额外的配置。

如果 align 被定义为一个对象，但是没有提供所有的参数，那么，未定义的参数将默认为：
```
// Defaults
align: {
    "beforeColon": false,
    "afterColon": true,
    "on": "colon",
    "mode": "strict"
}
```
选项 { "align": { } } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "one"   : 1,
    "seven" : 7
}
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": false,
        "afterColon": false,
        "on": "value"
    }
}]*/

var obj = {
    "one":  1,
    "seven":7
}
```
**align and multiLine**

multiLine 和 align 选项可以有所区别，这将允许对你的文件进行更细粒度的控制 key-spacing。如果 align 被配置为一个对象，align 将不会 从 multiLine 继承。

multiLine 可以在任何时候被用在跨行的对象字面量上。而当一个对象有多个属性时，使用 align 配置。
```
var myObj = {
  key1: 1, // uses multiLine

  key2: 2, // uses align (when defined)
  key3: 3, // uses align (when defined)

  key4: 4 // uses multiLine
}
```

选项 { "align": { }, "multiLine": { } } 的 **错误** 代码示例：
```
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon":true
    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
    },
    "one"             : 1,
    "seven"           : 7
}
```
选项 { "align": { }, "multiLine": { } } 的 **正确** 代码示例：
```
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon": true

    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
        //
    }, // These are two separate groups, so no alignment between `myObjectFuction` and `one`
    "one"   : 1,
    "seven" : 7 // `one` and `seven` are in their own group, and therefore aligned
}
```
**singleLine and multiLine**

选项 { "singleLine": { }, "multiLine": { } } 的 **正确** 代码示例：
```
/*eslint "key-spacing": [2, {
    "singleLine": {
        "beforeColon": false,
        "afterColon": true
    },
    "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
    }
}]*/
var obj = { one: 1, "two": 2, three: 3 };
var obj2 = {
    "two" : 2,
    three : 3
};
```

### space-in-parens

> 强制在圆括号内使用一致的空格

**Rule Details**

该规则将通过禁止或要求 ( 右边或 ) 左边有一个或多个空格来强制圆括号内空格的一致性。在任一情况下，仍将允许 ()。

**Options**

该规则有两个选项：

- "never" (默认) 强制圆括号内没有空格
- "always" 强制圆括号内有一个空格

根据您的编码约定，您可以在您的配置中选择使用任一选项：
```
"space-in-parens": ["error", "always"]
```
**“never”**

选项 "never" 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "never"]*/

foo( 'bar');
foo('bar' );
foo( 'bar' );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```
选项 "never" 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "never"]*/

foo();

foo('bar');

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```
**“always”**

选项 "always" 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "always"]*/

foo( 'bar');
foo('bar' );
foo('bar');

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```
选项 "always" 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "always"]*/

foo();

foo( 'bar' );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```
**Exceptions**

一个对象文本可以作为规则数组的第三个元素来制定例外情况，使用 "exceptions" 做主键，对应的值是一个数组。这些例外作用在第一个选项的基础上。如果 "always" 设置为强制使用空格，那么任何例外情况将 不允许使用空格。同样的，如果 "never"设置为禁止使用空格那么，任何例外情况将强制使用空格。

以下例外情况是有效的：["{}", "[]", "()", "empty"].

选项 "never", { "exceptions": ["{}"] } 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo(1, {bar: 'baz'});
```
选项 "never", { "exceptions": ["{}"] } 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo(1, {bar: 'baz'} );
```
选项 "always", { "exceptions": ["{}"] } 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo( 1, {bar: 'baz'} );
```
选项 "always", { "exceptions": ["{}"] } 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo( 1, {bar: 'baz'});
```
选项 "never", { "exceptions": ["[]"] } 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1);
```
选项 "never", { "exceptions": ["[]"] } 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1);
```
选项 "always", { "exceptions": ["[]"] } 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1 );
```
选项 "always", { "exceptions": ["[]"] } 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1 );
```
选项 "never", { "exceptions": ["()"] }] 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo((1 + 2));
foo((1 + 2), 1);
```
选项 "never", { "exceptions": ["()"] }] 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo( (1 + 2) );
foo( (1 + 2), 1);
```
选项 "always", { "exceptions": ["()"] }] 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo( ( 1 + 2 ) );
foo( ( 1 + 2 ), 1 );
```
选项 "always", { "exceptions": ["()"] }] 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo(( 1 + 2 ));
foo(( 1 + 2 ), 1 );
```
"empty" 例外关注空括号，与其他例外作用一样，与第一个选项相反。

选项 "never", { "exceptions": ["empty"] }] 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo();
```
选项 "never", { "exceptions": ["empty"] }] 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo( );
```
选项 "always", { "exceptions": ["empty"] }] 的 **错误** 代码示例：

/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo( );
```
选项 "always", { "exceptions": ["empty"] }] 的 **正确** 代码示例：

/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo();
```
你可以在 "exceptions" 数组中包含多个项。

选项 "always", { "exceptions": ["{}", "[]"] }] 的 **错误** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar( {bar:'baz'} );
baz( 1, [1,2] );
foo( {bar: 'baz'}, [1, 2] );
```
选项 "always", { "exceptions": ["{}", "[]"] }] 的 **正确** 代码示例：
```
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar({bar:'baz'});
baz( 1, [1,2]);
foo({bar: 'baz'}, [1, 2]);
```
### arrow-parens

> 要求箭头函数的参数使用圆括号

**Rule Details**

该规则强制箭头函数的参数使用圆括号括起来，不论参数数量如何。例如：
```
/*eslint-env es6*/

// Bad
a => {}

// Good
(a) => {}
```
这种风格将帮助你找到被错误地包含到条件语句中的箭头函数(=>)，其本意是想使用比较语句的，比如>=
```
/*eslint-env es6*/

// Bad
if (a => 2) {
}

// Good
if (a >= 2) {
}
```
该规则可以配置在不需要使用圆括号时，阻止圆括号的使用。
```
/*eslint-env es6*/

// Bad
(a) => {}

// Good
a => {}
```
**Options**

该规则有一个字符串选项和一个对象选项。

字符串选项：

- "always" (默认) 要求在所有情况下使用圆括号将参数括起来。
- "as-needed" 当只有一个参数时允许省略圆括号。


"as-needed" 选项的对象属性：

- "requireForBlockBody": true 修改 as-needed 规则以便如果函数体在一个指令块中（被花括号括起来）要求使用圆括号把参数括起来。

**always**

默认选项 "always" 的 **错误** 代码示例：
```
/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/

a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {} });
```
默认选项 "always" 的 **正确** 代码示例：
```
/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/

() => {};
(a) => {};
(a) => a;
(a) => {'\n'}
a.then((foo) => {});
a.then((foo) => { if (true) {} });
```
**If Statements**

该选项的一个好处是，它阻止了在条件语句中不正确地使用箭头函数。
```
/*eslint-env es6*/

var a = 1;
var b = 2;
// ...
if (a => b) {
 console.log('bigger');
} else {
 console.log('smaller');
}
// outputs 'bigger', not smaller as expected
```
if语句的内容是个箭头函数，不是比较语句。

如果需要使用箭头函数，它需要被圆括号括起来以消除歧义。
```
/*eslint-env es6*/

var a = 1;
var b = 0;
// ...
if ((a) => b) {
 console.log('truthy value returned');
} else {
 console.log('falsey value returned');
}
// outputs 'truthy value returned'
```
下面是另一个示例：
```
/*eslint-env es6*/

var a = 1, b = 2, c = 3, d = 4;
var f = a => b ? c: d;
// f = ?
```
f 是个箭头函数，a 是其参数，返回的结果是 b ? c: d。

应该被重写为：
```
/*eslint-env es6*/

var a = 1, b = 2, c = 3, d = 4;
var f = (a) => b ? c: d;
```
**as-needed**

选项 "as-needed" 的 **错误** 代码示例：
```
/*eslint arrow-parens: ["error", "as-needed"]*/
/*eslint-env es6*/

(a) => {};
(a) => a;
(a) => {'\n'};
a.then((foo) => {});
a.then((foo) => a);
a((foo) => { if (true) {} });
```
选项 "as-needed" 的 **正确** 代码示例：
```
/*eslint arrow-parens: ["error", "as-needed"]*/
/*eslint-env es6*/

() => {};
a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
```
**requireForBlockBody**

选项 { "requireForBlockBody": true } 的 **错误** 代码示例：
```
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
/*eslint-env es6*/

(a) => a;
a => {};
a => {'\n'};
a.map((x) => x * x);
a.map(x => {
  return x * x;
});
a.then(foo => {});
```
选项 { "requireForBlockBody": true } 的 **正确** 代码示例：
```
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
/*eslint-env es6*/

(a) => {};
(a) => {'\n'};
a => ({});
() => {};
a => a;
a.then((foo) => {});
a.then((foo) => { if (true) {} });
a((foo) => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
```