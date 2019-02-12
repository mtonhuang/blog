# ESLint 推荐的rules

[TOC]
### no-compare-neg-zero

> 禁止与 -0 进行比较

**Rule Details**

&emsp;该规则对试图与 -0 进行比较的代码发出警告，因为并不会达到预期。也就是说像 x === -0 的代码对于 +0 和 -0 都有效。作者可能想要用 Object.is(x, -0)。


**错误** 代码示例：
```javascript
if (x === -0) {
    // doSomething()...
}
```
**正确** 代码示例：

```javascript
if (x === 0) {
    //a doSomething()...
}
```
```javascript
if (Object.is(x, -0)) {
    // doSomething()...
}
```

### no-cond-assign

> 禁止条件表达式中出现赋值操作符

**Rule Details**

&emsp;该规则禁止在 if、for、while 和 do...while 语句中出现模棱两可的赋值操作符。

**options**

该规则有一个字符串选项：
- "except-parens" (默认) 允许条件语句中出现赋值操作符，前提是它们被圆括号括起来 (例如，在 while 或 do...while 循环条件中，允许赋值给一个变量)
- "always" 禁止条件语句中出现赋值语句


默认选项 "except-parens" 的 **错误** 代码示例：
```javascript
/*eslint no-cond-assign: "error"*/

// Unintentional assignment
var x;
if (x = 0) {
    var b = 1;
}

// Practical example that is similar to an error
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}
```
默认选项 "except-parens" 的 **正确** 代码示例：

```javascript
/*eslint no-cond-assign: "error"*/

// Assignment replaced by comparison
var x;
if (x === 0) {
    var b = 1;
}

// Practical example that wraps the assignment in parentheses
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

选项 "always" 的 **错误** 代码示例：
```javascript
/*eslint no-cond-assign: ["error", "always"]*/

// Unintentional assignment
var x;
if (x = 0) {
    var b = 1;
}

// Practical example that is similar to an error
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}

// Practical example that wraps the assignment in parentheses
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

选项 "always" 的 **正确** 代码示例：

```javascript
/*eslint no-cond-assign: ["error", "always"]*/

// Assignment replaced by comparison
var x;
if (x === 0) {
    var b = 1;
}
```

###	no-console

> 禁用 console

**Rule Details**

&emsp;该规则禁止调用 console 对象的方法。


**错误** 代码示例：
```javascript
/*eslint no-console: "error"*/

console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
```
**正确** 代码示例：

```javascript
/*eslint no-console: "error"*/

// custom console
Console.log("Hello world!");
```

**options**

&emsp;该规则有例外情况，是个对象：

- "allow" 是个字符串数组，包含允许使用的console 对象的方法

选项 { "allow": ["warn", "error"] } 的 **正确** 代码示例：

```javascript
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

console.warn("Log a warn level message.");
console.error("Log an error level message.");
```

**When Not To Use It**

&emsp;如果你在使用 Node.js，然后，console 主要用来向用户输出信息，所以不是严格用于调试目的。如果你正在做 Node.js 开发，那么你很可能不想启用此规则。

&emsp;另一个可能不使用此规则的情况是，如果你想执行控制台调用，而不是控制台重写。例如:

```javascript
/*eslint no-console: ["error", { allow: ["warn"] }] */
console.error = function (message) {
  throw new Error(message);
};
```

&emsp;在上面使用 no-console 规则的示例中，ESLint 将报告一个错误。对于上面的例子，你可以禁用该规则:

```javascipt
// eslint-disable-next-line no-console
console.error = function (message) {
  throw new Error(message);
};

// or

console.error = function (message) {  // eslint-disable-line no-console
  throw new Error(message);
};
```

&emsp;然而，你可能不希望手动添加 eslint-disable-next-line 或 eslint-disable-line。你可以使用 no-restricted-syntax 规则来实现控制台调用仅接收错误的效果:

```javascript
{
    "rules": {
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ]
    }
}
```

### no-constant-condition

> 禁止在条件中使用常量表达式

**Rule Details**

&emsp;该规则禁止在以下语句的条件中出现常量表达式：

- if、for、while 或 do...while 语句
- ?: 三元表达式


**错误** 代码示例：
```javascript
/*eslint no-constant-condition: "error"*/

if (false) {
    doSomethingUnfinished();
}

if (void x) {
    doSomethingUnfinished();
}

for (;-2;) {
    doSomethingForever();
}

while (typeof x) {
    doSomethingForever();
}

do {
    doSomethingForever();
} while (x = -1);

var result = 0 ? a : b;
```
**正确** 代码示例：

```javascript
/*eslint no-constant-condition: "error"*/

if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

var result = x !== 0 ? a : b;
```

**options**

checkLoops

&emsp;默认为 true。设置该选项为 false 允许在循环中使用常量表达式。

当 checkLoops 为 false 时的 **正确** 代码示例：

```js
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

while (true) {
    doSomething();
    if (condition()) {
        break;
    }
};

for (;true;) {
    doSomething();
    if (condition()) {
        break;
    }
};

do {
    doSomething();
    if (condition()) {
        break;
    }
} while (true)
```

### no-control-regex

> 禁止在正则表达式中使用控制字符

**Rule Details**

&emsp;该规则禁止在正则表达式中出现控制字符。


**错误** 代码示例：
```js
/*eslint no-control-regex: "error"*/

var pattern1 = /\x1f/;
var pattern2 = new RegExp("\x1f");
```

**正确** 代码示例：

```javascript
/*eslint no-control-regex: "error"*/

var pattern1 = /\x20/;
var pattern2 = new RegExp("\x20");
```

**When Not To Use It**

&emsp;如果你需要使用控制字符进行模式匹配，你应该关闭该规则。

### no-debugger

> 禁用 debugger

**Rule Details**

&emsp;该规则禁止 debugger 语句。


**错误** 代码示例：
```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    debugger;
    return Boolean(x);
}
```
**正确** 代码示例：
```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    return Boolean(x); // set a breakpoint at this line
}
```

**When Not To Use It**

&emsp;如果你的代码在很大程度上仍处于开发阶段，不想担心剥离 debugger 语句，那么就关闭此规则。通常在部署测试代码之前，你会想重新开启此规则。

### no-dupe-args

> 禁止 function 定义中出现重名参数

**Rule Details**

&emsp;该规则禁止在函数定义或表达中出现重名参数。该规则并不适用于箭头函数或类方法，因为解析器会报告这样的错误。

&emsp;如果 ESLint 在严格模式下解析代码，解析器（不是该规则）将报告这样的错误。


**错误** 代码示例：
```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, a) {
    console.log("value of the second a:", a);
}

var bar = function (a, b, a) {
    console.log("value of the second a:", a);
};
```
**正确** 代码示例：

```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, c) {
    console.log(a, b, c);
}

var bar = function (a, b, c) {
    console.log(a, b, c);
};
```

### no-dupe-keys

> 禁止对象字面量中出现重复的 key

**Rule Details**

&emsp;该规则禁止在对象字面量中出现重复的键。


**错误** 代码示例：
```js
/*eslint no-dupe-keys: "error"*/

var foo = {
    bar: "baz",
    bar: "qux"
};

var foo = {
    "bar": "baz",
    bar: "qux"
};

var foo = {
    0x1: "baz",
    1: "qux"
};
```
**正确** 代码示例：

```js
/*eslint no-dupe-keys: "error"*/

var foo = {
    bar: "baz",
    quxx: "qux"
};
```

### no-duplicate-case

> 禁止出现重复的 case 标签

**Rule Details**

&emsp;该规则禁止在 switch 语句中的 case 子句中出现重复的测试表达式。


**错误** 代码示例：
```js
/*eslint no-duplicate-case: "error"*/

var a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 1:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case one:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "1":         // duplicate test expression
        break;
    default:
        break;
}
```
**正确** 代码示例：

```js
/*eslint no-duplicate-case: "error"*/

var a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "3":
        break;
    default:
        break;
}
```

### no-empty

> 禁止出现空语句块

**Rule Details**

&emsp;该规则禁止空语句块出现。该规则忽略包含一个注释的语句块（例如，在 try 语句中，一个空的 catch 或 finally 语句块意味着程序应该继续执行，无论是否出现错误）。


**错误** 代码示例：
```js
/*eslint no-empty: "error"*/

if (foo) {
}

while (foo) {
}

switch(foo) {
}

try {
    doSomething();
} catch(ex) {

} finally {

}
```
**正确** 代码示例：

```js
/*eslint no-empty: "error"*/

if (foo) {
    // empty
}

while (foo) {
    /* empty */
}

try {
    doSomething();
} catch (ex) {
    // continue regardless of error
}

try {
    doSomething();
} finally {
    /* continue regardless of error */
}
```

**Options**

&emsp;该规则有例外情况，是个对象：

- "allowEmptyCatch": true 允许出现空的 catch 子句 (也就是说，不包含注释)

**allowEmptyCatch**

选项 { "allowEmptyCatch": true } 的 **正确** 代码示例：

```js
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
try {
    doSomething();
} catch (ex) {}

try {
    doSomething();
}
catch (ex) {}
finally {
    /* continue regardless of error */
}
```
**When Not To Use It**

&emsp;如果你打算使用空语句块，那么你可以禁用此规则。

### no-empty-character-class

> 禁止在正则表达式中使用空字符集

**Rule Details**

&emsp;该规则禁止在正则表达式中出现空字符集。


**错误** 代码示例：
```js
/*eslint no-empty-character-class: "error"*/

/^abc[]/.test("abcdefg"); // false
"abcdefg".match(/^abc[]/); // null
```
**正确** 代码示例：

```js
/*eslint no-empty-character-class: "error"*/

/^abc/.test("abcdefg"); // true
"abcdefg".match(/^abc/); // ["abc"]

/^abc[a-z]/.test("abcdefg"); // true
"abcdefg".match(/^abc[a-z]/); // ["abcd"]
```

**Known Limitations**

&emsp;该规则不会报告 RegExp 构造函数的字符串参数中空字符集的使用情况。

当该规则报告了正确代码时，漏报的示例：

```js
/*eslint no-empty-character-class: "error"*/

var abcNeverMatches = new RegExp("^abc[]");
```

###	no-ex-assign

> 禁止对 catch 子句的参数重新赋值

**Rule Details**

&emsp;该规则禁止对 catch 子句中的异常重新赋值。


**错误** 代码示例：
```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    e = 10;
}
```
**正确** 代码示例：

```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    var foo = 10;
}
```

**Further Reading**

- [The “catch” with try…catch](https://bocoup.com/blog/the-catch-with-try-catch) by Ben Alman explains how the exception identifier can leak into the outer scope in IE 6-8

### no-extra-boolean-cast

> 禁止不必要的布尔转换

**Rule Details**

&emsp;该规则禁止不必要的布尔类型转换。


**错误** 代码示例：
```js
/*eslint no-extra-boolean-cast: "error"*/

var foo = !!!bar;

var foo = !!bar ? baz : bat;

var foo = Boolean(!!bar);

var foo = new Boolean(!!bar);

if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

while (!!foo) {
    // ...
}

do {
    // ...
} while (Boolean(foo));

for (; !!foo; ) {
    // ...
}
```
**正确** 代码示例：

```js
/*eslint no-extra-boolean-cast: "error"*/

var foo = !!bar;
var foo = Boolean(bar);

function foo() {
    return !!bar;
}

var foo = bar ? !!baz : !!bat;
```

### no-extra-semi

> 禁止不必要的分号

**Rule Details**

该规则禁用不必要的分号。


**错误** 代码示例：
```js
/*eslint no-extra-semi: "error"*/

var x = 5;;

function foo() {
    // code
};

```
**正确** 代码示例：

```js
/*eslint no-extra-semi: "error"*/

var x = 5;

var foo = function() {
    // code
};

```

**When Not To Use It**

如果你有意使用额外的分号，那么你可以禁用此规则。

### no-func-assign

> 禁止对 function 声明重新赋值

**Rule Details**

该规则禁止对 function 声明重新赋值。


**错误** 代码示例：
```js
/*eslint no-func-assign: "error"*/

function foo() {}
foo = bar;

function foo() {
    foo = bar;
}
```

与 JSHint 中对应的规则不同，该规则的 **错误** 代码示例：

```js
/*eslint no-func-assign: "error"*/

foo = bar;
function foo() {}
```
**正确** 代码示例：

```js
/*eslint no-func-assign: "error"*/

var foo = function () {}
foo = bar;

function foo(foo) { // `foo` is shadowed.
    foo = bar;
}

function foo() {
    var foo = bar;  // `foo` is shadowed.
}
```

### no-inner-declarations

> 禁止在嵌套的块中出现变量声明或 function 声明

**Rule Details**

该规则要求函数声明和变量声明（可选的）在程序或函数体的顶部。

**Options**

该规则有一个字符串选项：

- "functions" (默认) 禁止 function 声明出现在嵌套的语句块中
- "both" 禁止 function 和 var 声明出现在嵌套的语句块中

**functions**

默认选项 "functions" 的 **错误** 代码示例：
```js
/*eslint no-inner-declarations: "error"*/

if (test) {
    function doSomething() { }
}

function doSomethingElse() {
    if (test) {
        function doAnotherThing() { }
    }
}
```
默认选项 "functions" 的 **正确** 代码示例：

```js
/*eslint no-inner-declarations: "error"*/

function doSomething() { }

function doSomethingElse() {
    function doAnotherThing() { }
}

if (test) {
    asyncCall(id, function (err, data) { });
}

var fn;
if (test) {
    fn = function fnExpression() { };
}
```

**both**

选项 "both" 的 **错误** 代码示例：

```js

/*eslint no-inner-declarations: ["error", "both"]*/

if (test) {
    var foo = 42;
}

function doAnotherThing() {
    if (test) {
        var bar = 81;
    }
}

```

选项 "both" 的 **正确** 代码示例：

```js
/*eslint no-inner-declarations: "error"*/
/*eslint-env es6*/

var bar = 42;

if (test) {
    let baz = 43;
}

function doAnotherThing() {
    var baz = 81;
}
```

**When Not To Use It**

当 [block-scoped functions](https://bugzilla.mozilla.org/show_bug.cgi?id=585536) 出现在 ES6 中时，函数声明的部分规则将被废弃，但在那之前，它应该是行之有效的。当使用 [block-scoped-var](https://cn.eslint.org/docs/rules/block-scoped-var) 规则时或者在嵌套块中声明变量是可以接受的（尽管有变量声明提升）时候，可以不再检测变量声明。


### no-invalid-regexp

> 禁止 RegExp 构造函数中存在无效的正则表达式字符串

**Rule Details**

该规则禁止在 RegExp 构造函数中出现无效的正则表达式。


**错误** 代码示例：
```js
/*eslint no-invalid-regexp: "error"*/

RegExp('[')

RegExp('.', 'z')

new RegExp('\\')
```
**正确** 代码示例：

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('.')

new RegExp

this.RegExp('[')
```

**Environments**

ECMAScript 6 为 RegExp 构造函数增加了以下标志参数：

- "u" (unicode)
- "y" (sticky)
你可以在你的 ESLint 配置 中通过设置 ECMAScript 为 6 ，来使这些标志被有效地识别。

如果你想允许使用额外的标志，也不论出于什么目的，你可以在 .eslintrc 使用 allowConstructorFlags 选项指定它们。这样，不管是否有 ecmaVersion 设置，这些标记将会被该规则忽略。

**Options**

该规则有例外情况，是个对象：

- "allowConstructorFlags" 是个标志的数组

**allowConstructorFlags**

选项 { "allowConstructorFlags": ["u", "y"] } 的 **正确** 代码示例：

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["u", "y"] }]*/

new RegExp('.', 'y')

new RegExp('.', 'yu')

```
Further Reading
- [Annotated ES5 §7.8.5 - Regular Expression Literals](https://es5.github.io/#x7.8.5)


### no-irregular-whitespace

> 禁止在字符串和注释之外不规则的空白

**Rule Details**

该规则旨在捕获无效的不是正常的tab和空格的空白。这些字符有的会在现代浏览器中引发问题，其它的会引起调试问题。

该规则禁止出现以下字符，除非该规则选项允许：

```
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u00A0 - No-Break Space - <NBSP>
\u0085 - Next Line
\u1680 - Ogham Space Mark
\u180E - Mongolian Vowel Separator - <MVS>
\ufeff - Zero Width No-Break Space - <BOM>
\u2000 - En Quad
\u2001 - Em Quad
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Tree-Per-Em
\u2005 - Four-Per-Em
\u2006 - Six-Per-Em
\u2007 - Figure Space
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space
\u200A - Hair Space
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator
\u2029 - Paragraph Separator
\u202F - Narrow No-Break Space
\u205f - Medium Mathematical Space
\u3000 - Ideographic Space
```
**Options**

该规则有例外情况，是个对象：

- "skipStrings": true (默认) 允许在字符串字面量中出现任何空白字符
- "skipComments": true 允许在注释中出现任何空白字符
- "skipRegExps": true 允许在正则表达式中出现任何空白字符
- "skipTemplates": true 允许在模板字面量中出现任何空白字符

**skipStrings**

默认选项 { "skipStrings": true } 的 **错误** 代码示例：
```js
/*eslint no-irregular-whitespace: "error"*/

function thing() /*<NBSP>*/{
    return 'test';
}

function thing( /*<NBSP>*/){
    return 'test';
}

function thing /*<NBSP>*/(){
    return 'test';
}

function thing᠎/*<MVS>*/(){
    return 'test';
}

function thing() {
    return 'test'; /*<ENSP>*/
}

function thing() {
    return 'test'; /*<NBSP>*/
}

function thing() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/

function thing() {
    return / <NBSP>regexp/;
}

/*eslint-env es6*/
function thing() {
    return `template <NBSP>string`;
}
```
默认选项 { "skipStrings": true } **正确** 代码示例：

```js
/*eslint no-irregular-whitespace: "error"*/

function thing() {
    return ' <NBSP>thing';
}

function thing() {
    return '​<ZWSP>thing';
}

function thing() {
    return 'th <NBSP>ing';
}
```

**skipComments**

选项 { "skipComments": true } 的 **正确** 代码示例：
```js
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/

function thing() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/
```

**skipRegExps**

选项 { "skipRegExps": true } 的 **正确** 代码示例：

```js
/*eslint no-irregular-whitespace: ["error", { "skipRegExps": true }]*/

function thing() {
    return / <NBSP>regexp/;
}
```

**skipTemplates**

选项 { "skipTemplates": true } 的 **正确** 代码示例：
```js
/*eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/
/*eslint-env es6*/

function thing() {
    return `template <NBSP>string`;
}
```
**When Not To Use It**

如果你想在你的应用中使用 tab 和空格之外的空白字符，可以关闭此规则。

### no-obj-calls

> 禁止把全局对象作为函数调用

**Rule Details**

该规则禁止将 Math、JSON 和 Reflect 对象当作函数进行调用。


**错误** 代码示例：
```js
/*eslint no-obj-calls: "error"*/

var math = Math();
var json = JSON();
var reflect = Reflect();
```
**正确** 代码示例：

```js
/*eslint no-obj-calls: "error"*/

function area(r) {
    return Math.PI * r * r;
}
var object = JSON.parse("{}");
var value = Reflect.get({ x: 1, y: 2 }, "x");
```

### no-regex-spaces

> 禁止正则表达式字面量中出现多个空格

**Rule Details**

该规则禁止在正则表达式字面量中出现多个空格。

**错误** 代码示例：
```javascript
/*eslint no-regex-spaces: "error"*/

var re = /foo   bar/;
var re = new RegExp("foo   bar");
```
**正确** 代码示例：

```
/*eslint no-regex-spaces: "error"*/

var re = /foo {3}bar/;
var re = new RegExp("foo {3}bar");
```

### no-sparse-arrays

> 禁用稀疏数组

**Rule Details**

该规则禁止使用稀疏数组，也就是逗号之前没有任何元素的数组。该规则不适用于紧随最后一个元素的拖尾逗号的情况。

**错误** 代码示例：
```javascript
/*eslint no-sparse-arrays: "error"*/

var items = [,];
var colors = [ "red",, "blue" ];
```
**正确** 代码示例：

```
/*eslint no-sparse-arrays: "error"*/

var items = [];
var items = new Array(23);

// trailing comma (after the last element) is not a problem
var colors = [ "red", "blue", ];
```


### no-unexpected-multiline

> 禁止出现令人困惑的多行表达式

**Rule Details**

该规则禁止使用令人困惑的多行表达式。

**错误** 代码示例：
```javascript
/*eslint no-unexpected-multiline: "error"*/

var foo = bar
(1 || 2).baz();

var hello = 'world'
[1, 2, 3].forEach(addNumber);

let x = function() {}
`hello`

let x = function() {}
x
`hello`

let x = foo
/regex/g.test(bar)
```
**正确** 代码示例：

```
/*eslint no-unexpected-multiline: "error"*/

var foo = bar;
(1 || 2).baz();

var foo = bar
;(1 || 2).baz()

var hello = 'world';
[1, 2, 3].forEach(addNumber);

var hello = 'world'
void [1, 2, 3].forEach(addNumber);

let x = function() {};
`hello`

let tag = function() {}
tag `hello`
```


### no-unreachable

> 禁止在return、throw、continue 和 break 语句之后出现不可达代码

**Rule Details**

该规则禁止在 return、throw、continue 和 break 语句后出现不可达代码。

**错误** 代码示例：
```javascript
/*eslint no-unreachable: "error"*/

function foo() {
    return true;
    console.log("done");
}

function bar() {
    throw new Error("Oops!");
    console.log("done");
}

while(value) {
    break;
    console.log("done");
}

throw new Error("Oops!");
console.log("done");

function baz() {
    if (Math.random() < 0.5) {
        return;
    } else {
        throw new Error();
    }
    console.log("done");
}

for (;;) {}
console.log("done");
```
**正确** 代码示例，因为 JavaScript 函数和变量提升：

```
/*eslint no-unreachable: "error"*/

function foo() {
    return bar();
    function bar() {
        return 1;
    }
}

function bar() {
    return x;
    var x;
}

switch (foo) {
    case 1:
        break;
        var x;
}
```


### no-unsafe-finally

> 禁止在 finally 语句块中出现控制流语句

**Rule Details**

该规则禁止在 finally 语句块中出现 return、throw、break 和 continue 语句。它允许间接使用，比如在 function 或 class 的定义中。

**错误** 代码示例：
```javascript
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        return 3;
    }
};
```
```javascript
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        throw new Error;
    }
};
```
**正确** 代码示例：

```
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        console.log("hola!");
    }
};
```
```
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        let a = function() {
            return "hola!";
        }
    }
};
```
```
/*eslint no-unsafe-finally: "error"*/
let foo = function(a) {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        switch(a) {
            case 1: {
                console.log("hola!")
                break;
            }
        }
    }
};
```


### no-unsafe-negation

> 禁止对关系运算符的左操作数使用否定操作符

**Rule Details**

该规则禁止对关系运算符的左操作数使用否定操作符。

关系运算符有：

- in 运算符.
- instanceof 运算符.

**错误** 代码示例：
```javascript
/*eslint no-unsafe-negation: "error"*/

if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}

if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
}
```
**正确** 代码示例：

```
/*eslint no-unsafe-negation: "error"*/

if (!(key in object)) {
    // key is not in object
}

if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
}

if(("" + !key) in object) {
    // make operator precedence and type conversion explicit
    // in a rare situation when that is the intended meaning
}
```
Options
无。


### use-isnan

> 该规则禁止与 ‘NaN’ 的比较。

**Rule Details**

该规则禁止在正则表达式字面量中出现多个空格。

**错误** 代码示例：
```javascript
/*eslint use-isnan: "error"*/

if (foo == NaN) {
    // ...
}

if (foo != NaN) {
    // ...
}
```
**正确** 代码示例：

```
/*eslint use-isnan: "error"*/

if (isNaN(foo)) {
    // ...
}

if (!isNaN(foo)) {
    // ...
}
```


### valid-typeof

> 强制 typeof 表达式与有效的字符串进行比较

**Rule Details**

该规则强制 typeof 表达式与有效的字符串进行比较。

Options

该规则有一个对象选项：

- "requireStringLiterals": true 要求 typeof 表达式只与字符串字面量或其它 typeof 表达式 进行比较，禁止与其它值进行比较。

**错误** 代码示例：
```javascript
/*eslint valid-typeof: "error"*/

typeof foo === "strnig"
typeof foo == "undefimed"
typeof bar != "nunber"
typeof bar !== "function"
```
**正确** 代码示例：

```js
/*eslint valid-typeof: "error"*/

typeof foo === "string"
typeof bar == "undefined"
typeof foo === baz
typeof bar === typeof qux
```
选项 { "requireStringLiterals": true } 的 **错误** 代码示例：
```javascript
typeof foo === undefined
typeof bar == Object
typeof baz === "strnig"
typeof qux === "some invalid type"
typeof baz === anotherVariable
typeof foo == 5
```
选项 { "requireStringLiterals": true } 的 **正确** 代码示例：

```js
typeof foo === "undefined"
typeof bar == "object"
typeof baz === "string"
typeof bar === typeof qux
```
### no-case-declarations

> 不允许在 case 子句中使用词法声明

**Rule Details**

该规则旨在避免访问未经初始化的词法绑定以及跨 case 语句访问被提升的函数。


**错误** 代码示例：
```javascript
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}
```
**正确** 代码示例：

```js
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

// Declarations outside switch-statements are valid
const a = 0;

switch (foo) {
    // The following case clauses are wrapped into blocks using brackets
    case 1: {
        let x = 1;
        break;
    }
    case 2: {
        const y = 2;
        break;
    }
    case 3: {
        function f() {}
        break;
    }
    case 4:
        // Declarations using var without brackets are valid due to function-scope hoisting
        var z = 4;
        break;
    default: {
        class C {}
    }
}
```

### no-empty-pattern

> 禁止使用空解构模式

**Rule Details**

此规则目的在于标记出在解构对象和数组中的任何的空模式，每当遇到一个这样的空模式，该规则就会报告一个问题。


**错误** 代码示例：
```javascript
/*eslint no-empty-pattern: "error"*/

var {} = foo;
var [] = foo;
var {a: {}} = foo;
var {a: []} = foo;
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```
**正确** 代码示例：

```js
/*eslint no-empty-pattern: "error"*/

var {a = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
```


### no-fallthrough

> 禁止 case 语句落空

**Rule Details**

该规则旨在消除非故意 case 落空行为。因此，它会标记处没有使用注释标明的落空情况。

**错误** 代码示例：
```javascript
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomething();
}
```
**正确** 代码示例：

```js
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
}

function bar(foo) {
    switch(foo) {
        case 1:
            doSomething();
            return;

        case 2:
            doSomething();
    }
}

switch(foo) {
    case 1:
        doSomething();
        throw new Error("Boo!");

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
    case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // falls through

    case 2:
        doSomething();
}
```

注意，在上面的例子中，最后的 case 语句，不会引起警告，因为没有可落空的语句了。

**Options**

该规则接受单个选项参数：

- 设置 commentPattern 选项为一个正则表达式字符串，来改变对有意为之的落空注释的检索

commentPattern

选项 { "commentPattern": "break[\\s\\w]*omitted" } 的 **正确** 代码示例：

```javascript
/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

switch(foo) {
    case 1:
        doSomething();
        // break omitted

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // caution: break is omitted intentionally

    default:
        doSomething();
}
```


### no-global-assign

>禁止对原生对象或只读的全局对象进行赋值

**Rule Details**

该规则禁止修改只读的全局变量。

ESLint 可以配置全局变量为只读。

- Specifying Environments
- Specifying Globals


**错误** 代码示例：
```javascript
/*eslint no-global-assign: "error"*/

Object = null
undefined = 1
```
```
/*eslint no-global-assign: "error"*/
/*eslint-env browser*/

window = {}
length = 1
top = 1
```
```
/*eslint no-global-assign: "error"*/
/*globals a:false*/

a = 1
```
**正确** 代码示例：

```js
/*eslint no-global-assign: "error"*/

a = 1
var b = 1
b = 2
```
```js
/*eslint no-global-assign: "error"*/
/*eslint-env browser*/

onload = function() {}
```
```js
/*eslint no-global-assign: "error"*/
/*globals a:true*/

a = 1
```
**Options**

该规则接受一个 exceptions 选项，可以用来指定允许进行赋值的内置对象列表：

```js
{
    "rules": {
        "no-global-assign": ["error", {"exceptions": ["Object"]}]
    }
}
```

### no-octal

> 禁用八进制字面量

**Rule Details**

该规则禁用八进制字面量。

如果 ESLint 是在严格模式下解析代码，解析器（而不是该规则）会报告错误。


**错误** 代码示例：
```javascript
/*eslint no-octal: "error"*/

var num = 071;
var result = 5 + 07;
```
**正确** 代码示例：

```js
/*eslint no-octal: "error"*/

var num  = "071";
```

### no-redeclare

> 禁止多次声明同一变量

**Rule Details**

此规则目旨在消除同一作用域中多次声明同一变量。

**错误** 代码示例：
```javascript
/*eslint no-redeclare: "error"*/

var a = 3;
var a = 10;
```
**正确** 代码示例：

```js
/*eslint no-redeclare: "error"*/

var a = 3;
// ...
a = 10;
```

**Options**

该规则有一个选项参数，是个对象，该对象有个布尔属性为 "builtinGlobals"。默认为false。

如果设置为 true，该规则也会检查全局内建对象，比如Object、Array、Number…

**builtinGlobals**

"builtinGlobals" 选项将会在全局范围检查被重新声明的内置全局变量。

选项 { "builtinGlobals": true } 的 **错误** 代码示例：

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/

var Object = 0;
```

在 browser 环境下，选项 {"builtinGlobals": true} 的 **错误** 代码示例：

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/
/*eslint-env browser*/

var top = 0;
```
browser 环境有很多内建的全局变量（例如，top）。一些内建的全局变量不能被重新声明。

注意，当使用 node 或 commonjs 环境 (或 ecmaFeatures.globalReturn，如果使用默认解析器)时，则程序的最大作用域不是实际的全局作用域，而是一个模块作用域。当出现这种情况时，声明一个以内置的全局变量命令的变量，不算是重声明，只是遮蔽了全局变量。在这种情况下，应该使用 no-shadow 规则的 "builtinGlobals" 选项。


### no-self-assign

> 禁止自我赋值

**Rule Details**

该规则旨在消除自身赋值的情况。

**错误** 代码示例：
```javascript
/*eslint no-self-assign: "error"*/

foo = foo;

[a, b] = [a, b];

[a, ...b] = [x, ...b];

({a, b} = {a, x});
```
**正确** 代码示例：

```js
/*eslint no-self-assign: "error"*/

foo = bar;
[a, b] = [b, a];

// This pattern is warned by the `no-use-before-define` rule.
let foo = foo;

// The default values have an effect.
[foo = 1] = [foo];
```

**Options**

该规则也有可以检查属性的选项。

```js
{
    "no-self-assign": ["error", {"props": false}]
}
```

- props - 如果为 true，no-self-assign 规则将对属性的自我赋值发出警告。默认为 false.

**props**

选项 { "props": true } 的 **错误** 代码示例：

```js
/*eslint no-self-assign: [error, {props: true}]*/

// self-assignments with properties.
obj.a = obj.a;
obj.a.b = obj.a.b;
obj["a"] = obj["a"];
obj[a] = obj[a];
```

选项 { "props": true } 的 **正确** 代码示例：

```js
/*eslint no-self-assign: [error, {props: true}]*/

// non-self-assignments with properties.
obj.a = obj.b;
obj.a.b = obj.c.b;
obj.a.b = obj.a.c;
obj[a] = obj["a"]

// This ignores if there is a function call.
obj.a().b = obj.a().b
a().b = a().b

// Known limitation: this does not support computed properties except single literal or single identifier.
obj[a + b] = obj[a + b];
obj["a" + "b"] = obj["a" + "b"];
```

### no-unused-labels

> 禁用出现未使用过的标

**Rule Details**

该规则旨在消除未使用过的标签。


**错误** 代码示例：
```javascript
/*eslint no-unused-labels: "error"*/

A: var foo = 0;

B: {
    foo();
}

C:
for (let i = 0; i < 10; ++i) {
    foo();
}
```
**正确** 代码示例：

```js
/*eslint no-unused-labels: "error"*/

A: {
    if (foo()) {
        break A;
    }
    bar();
}

B:
for (let i = 0; i < 10; ++i) {
    if (foo()) {
        break B;
    }
    bar();
}
```


### no-useless-escape

> 禁用不必要的转义字符

**Rule Details**

该规则标记在不改变代码行为的情况下可以安全移除的转义。


**错误** 代码示例：
```javascript
/*eslint no-useless-escape: "error"*/

"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
```
**正确** 代码示例：

```js
/*eslint no-useless-escape: "error"*/

"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
```


### no-delete-var

> 禁用不必要的转义字符

**Rule Details**

该规则禁止对变量使用 delete 操作符。

如果 ESLint 是在严格模式下解析代码，解析器（而不是该规则）会报告错误。

**错误** 代码示例：
```javascript
/*eslint no-delete-var: "error"*/

var x;
delete x;
```


### no-undef

> 禁用未声明的变量，除非它们在 /*global */ 注释中被提到

**Rule Details**

对任何未声明的变量的引用都会引起一个警告，除非显式地在 /*global ...*/ 注释中指定，或在 globals key in the configuration file 中指定。另一个常见的用例是，你有意使用定义在其他地方的全局变量(例如来自 HTML 的脚本)。


**错误** 代码示例：
```javascript
/*eslint no-undef: "error"*/

var a = someFunction();
b = 10;
```
有 global 声明时，该规则的 **正确** 代码示例：

```js
/*global someFunction b:true*/
/*eslint no-undef: "error"*/

var a = someFunction();
b = 10;
```
有 global 声明时，该规则的 **错误** 代码示例：

```js
/*global b*/
/*eslint no-undef: "error"*/

b = 10;
```
默认情况下，/*global */ 中声明的变量是只读的，因此对其进行赋值是错误的。

**Options**

- typeof 设置为 true，将对 typeof 中用到的变量发出警告（默认为false）。

**typeof**

默认选项 { "typeof": false } 的 **正确** 代码示例：
```js
/*eslint no-undef: "error"*/

if (typeof UndefinedIdentifier === "undefined") {
    // do something ...
}
```
如果想阻止在 typeof 运算中有未申明的变量导致的警告，可以用此项。

选项 { "typeof": true } 的 **错误** 代码示例：
```js
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```
有 global 声明时，选项 { "typeof": true } 的 **正确** 代码示例：
```js
/*global a*/
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```
**Environments**

为了方便，ESlint 提供了预定义流行类库和运行时环境暴露的全局变量的快捷方式。该规则支持这些环境，如 指定 Environments 中列出的。使用如下：

**browser**

browser 环境下的 **正确** 代码示例：
```js
/*eslint no-undef: "error"*/
/*eslint-env browser*/

setTimeout(function() {
    alert("Hello");
});
```
**Node.js**

node 环境下的 **正确** 代码示例：
```js
/*eslint no-undef: "error"*/
/*eslint-env node*/

var fs = require("fs");
module.exports = function() {
    console.log(fs);
};
```

### no-unused-vars

> 禁止出现未使用过的变量

**Rule Details**

此规则旨在消除未使用过的变量，方法和方法中的参数名，当发现这些存在，发出警告。

符合下面条件的变量被认为是可以使用的:

- 作为回调函数
- 被读取 (var y = x)
- 传入函数中作为argument对象(doSomething(x))
- 在传入到另一个函数的函数中被读取

一个变量仅仅是被赋值为 (var x = 5) 或者是被声明过，则认为它是没被考虑使用。


**错误** 代码示例：
```javascript
/*eslint no-unused-vars: "error"*/
/*global some_unused_var*/

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function(foo) {
    return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
    if (n < 2) return 1;
    return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
    return y;
}
```
**正确** 代码示例：

```js
/*eslint no-unused-vars: "error"*/

var x = 10;
alert(x);

// foo is considered used here
myFunc(function foo() {
    // ...
}.bind(this));

(function(foo) {
    return foo;
})();

var myFunc;
myFunc = setTimeout(function() {
    // myFunc is considered used
    myFunc();
}, 50);

// Only the second argument from the descructured array is used.
function getY([, y]) {
    return y;
}
```
**exported**

在 CommonJS 或者 ECMAScript 模块外部，可用 var创建一个被其他模块代码引用的变量。你也可以用 /* exported variableName */ 注释快表明此变量已导出，因此此变量不会被认为是未被使用过的。

需要注意的是 /* exported */ 在下列情况下是无效的：

- node 或 commonjs 环境
- parserOptions.sourceType 是 module
- ecmaFeatures.globalReturn 为 true

行注释 // exported variableName 将不起作用，因为 exported 不是特定于行的。

选项 /* exported variableName */ 的 **正确** 代码示例：
```js
/* exported global_var */

var global_var = 42;
```
**Options**

该规则接受一个字符串或者对像类型的参数。字符串设置正如同 vars 一样（如下所示）。

配置项的默认值，变量选项是 all，参数的选项是 after-used 。
```js
{
    "rules": {
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    }
}
```
**vars**

此配置项有两个值：

- all 检测所有变量，包括全局环境中的变量。这是默认值。
- local 仅仅检测本作用域中声明的变量是否使用，允许不使用全局环境中的变量。

**vars: local**

选项 { "vars": "local" } 的 正确 代码示例：
```js
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*global some_unused_var */

some_unused_var = 42;
```
**varsIgnorePattern**

这个 varsIgnorePattern 选项指定了不需要检测的异常：变量名称匹配正则模式。例如，变量的名字包含 ignored 或者 Ignored。

选项 { "varsIgnorePattern": "[iI]gnored" } 的 **正确** 代码示例：

```js
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

var firstVarIgnored = 1;
var secondVar = 2;
console.log(secondVar);
```

**args**

args 选项有三个值：

- after-used - 最后一个参数必须使用。如：一个函数有两个参数，你使用了第二个参数，ESLint 不会报警告。
- all - 所有命名参数必须使用。
- none - 不检查参数。

**args: after-used**

选项 { "args": "after-used" } 的 **错误** 代码示例：
```js
/*eslint no-unused-vars: ["error", { "args": "after-used" }]*/

// 1 error
// "baz" is defined but never used
(function(foo, bar, baz) {
    return bar;
})();
```
选项 { "args": "after-used" } 的 正确 代码示例：
```
/*eslint no-unused-vars: ["error", {"args": "after-used"}]*/

(function(foo, bar, baz) {
    return baz;
})();
```
**args: all**

选项 { "args": "all" } 的 错误 代码示例：
```js
/*eslint no-unused-vars: ["error", { "args": "all" }]*/

// 2 errors
// "foo" is defined but never used
// "baz" is defined but never used
(function(foo, bar, baz) {
    return bar;
})();
```
**args: none**

选项 { "args": "none" } 的 正确 代码示例：
```js
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

(function(foo, bar, baz) {
    return bar;
})();
```
**ignoreRestSiblings**

ignoreRestSiblings 选项是个布尔类型 (默认: false)。使用 Rest 属性 可能会“省略”对象中的属性，但是默认情况下，其兄弟属性被标记为 “unused”。使用该选项可以使 rest 属性的兄弟属性被忽略。

选项 { "ignoreRestSiblings": true } 的 **正确** 代码示例：
```js
/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
// 'type' is ignored because it has a rest property sibling.
var { type, ...coords } = data;
```
**argsIgnorePattern**

argsIgnorePattern 选项指定排除不需要检测：这些参数的名字符合正则匹配。例如，下划线开头的变量。

选项 { "argsIgnorePattern": "^_" } 的 **正确** 代码示例：
```js
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

function foo(x, _y) {
    return x + 1;
}
foo();
```
**caughtErrors**

caughtErrors 选项被用来验证 catch 块的参数。

它有两个设置：

- none - 不检查错误对象。这是默认设置。
- all - 所有参数必须被使用。

caughtErrors: none
没有指定该规则，相当于将它赋值为 none。

选项 { "caughtErrors": "none" } 的 **正确** 代码示例：
```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "none" }]*/

try {
    //...
} catch (err) {
    console.error("errors");
}
```
**caughtErrors: all**

选项 { "caughtErrors": "all" } 的 **错误** 代码示例：
```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all" }]*/

// 1 error
// "err" is defined but never used
try {
    //...
} catch (err) {
    console.error("errors");
}
```
**caughtErrorsIgnorePattern**

caughtErrorsIgnorePattern 选项指定例外情况，不会检查匹配正则表达式 catch 参数。例如，名字以 ‘ignore’ 开头的变量。

选项 { "caughtErrorsIgnorePattern": "^ignore" } 的 正确 代码示例：
```js
/*eslint no-unused-vars: ["error", { "caughtErrorsIgnorePattern": "^ignore" }]*/

try {
    //...
} catch (ignoreErr) {
    console.error("errors");
}
```

### no-mixed-spaces-and-tabs

> 禁止空格和 tab 的混合缩进

**Rule Details**

该规则禁止使用 空格 和 tab 混合缩进。


**错误** 代码示例：
```javascript
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
// --->..return x + y;

      return x + y;
}

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```
**正确** 代码示例：

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
// --->return x + y;
    return x + y;
}
```
**Options**

该规则有一个字符串选项。

- "smart-tabs" 当 tab 是为了对齐，允许混合使用空格和 tab。

**smart-tabs**

选项 "smart-tabs" 的 正确 代码示例：
```js
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```

### constructor-super

> 要求在构造函数中有 super() 的调用

**Rule Details**

该规则旨在标记无效或缺失的 super() 调用。

**错误** 代码示例：
```javascript
/*eslint constructor-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() {
        super();  // This is a SyntaxError.
    }
}

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
    constructor() {
        super();  // Would throw a TypeError.
    }
}

class A extends null {
    constructor() { }  // Would throw a ReferenceError.
}
```
**正确** 代码示例：

```js
/*eslint constructor-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() { }
}

class A extends B {
    constructor() {
        super();
    }
}
```


### no-class-assign

> 禁止修改类声明的变量

**Rule Details**

该规则旨在标记类声明中变量的修改情况。


**错误** 代码示例：
```javascript
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

class A { }
A = 0;
```
```javascript
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

A = 0;
class A { }
```
```javascript
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

class A {
    b() {
        A = 0;
    }
}
```
```javascript
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class A {
    b() {
        A = 0;
        // `let A` is shadowed by the class name.
    }
}
```
**正确** 代码示例：

```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class A { }
A = 0; // A is a variable.
```
```js
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```
```js
/*eslint no-class-assign: 2*/
/*eslint-env es6*/

class A {
    b(A) {
        A = 0; // A is a parameter.
    }
}
```


### no-const-assign

> 禁止修改 const 声明的变量

**Rule Details**

该规则旨在标记修改用const关键字声明的变量。


**错误** 代码示例：
```javascript
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
a = 1;
```
```javascript
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
a += 1;
```
```javascript
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
++a;
```
**正确** 代码示例：

```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

const a = 0;
console.log(a);
```
```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```
```js
/*eslint no-const-assign: "error"*/
/*eslint-env es6*/

for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```


### no-dupe-class-members

> 禁止类成员中出现重复的名称

**Rule Details**

该规则旨在标记类成员中重复名称的使用。


**错误** 代码示例：
```javascript
/*eslint no-dupe-class-members: "error"*/
/*eslint-env es6*/

class Foo {
  bar() { }
  bar() { }
}

class Foo {
  bar() { }
  get bar() { }
}

class Foo {
  static bar() { }
  static bar() { }
}
```
**正确** 代码示例：

```js
/*eslint no-dupe-class-members: "error"*/
/*eslint-env es6*/

class Foo {
  bar() { }
  qux() { }
}

class Foo {
  get bar() { }
  set bar(value) { }
}

class Foo {
  static bar() { }
  bar() { }
}
```


### no-new-symbol

> 禁止 Symbolnew 操作符和 new 一起使用

**Rule Details**

该规则旨在阻止使用 new 操作符调用 Symbol。


**错误** 代码示例：
```javascript
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = new Symbol('foo');
```
**正确** 代码示例：

```js
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = Symbol('foo');


// Ignores shadowed Symbol.
function bar(Symbol) {
    const baz = new Symbol("baz");
}
```


### no-this-before-super

> 禁止在构造函数中，在调用 super() 之前使用 this 或 super

**Rule Details**

该规则旨在标记出在调用 super() 之前使用 this 或 super 的情况。

**错误** 代码示例：
```javascript
/*eslint no-this-before-super: "error"*/
/*eslint-env es6*/

class A extends B {
    constructor() {
        this.a = 0;
        super();
    }
}

class A extends B {
    constructor() {
        this.foo();
        super();
    }
}

class A extends B {
    constructor() {
        super.foo();
        super();
    }
}

class A extends B {
    constructor() {
        super(this.foo());
    }
}
```
**正确** 代码示例：

```js
/*eslint no-this-before-super: "error"*/
/*eslint-env es6*/

class A {
    constructor() {
        this.a = 0; // OK, this class doesn't have an `extends` clause.
    }
}

class A extends B {
    constructor() {
        super();
        this.a = 0; // OK, this is after `super()`.
    }
}

class A extends B {
    foo() {
        this.a = 0; // OK. this is not in a constructor.
    }
}
```