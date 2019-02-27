首先，我们先去官网把JQ的js相关文件download到本地，看着源码，仿照写法，一步步实现并且理解jq的原理。

接着创建一个属于自己的js文件(取名为jquerMey-1.0.1js)。

 这里先说一下解析源码的几个步骤：

1. 学会分析组成及架构 =>
（JQ通过选择器（字符串）来检索所有匹配的DOM，并且进行批量操作，同时能够帮我们解决浏览器的兼容问题。）

2. 学会看英文注释（不懂多用腾讯翻译君[手动滑稽]）

3. 先减后删

4. 阅读思考作者的语义

5. 尝试补全
好的，开搞吧！

首先创立一个html文件，如图：
```
<!DOCTYPE html>
 <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>jQuery源码解析</title>
  </head>
  <body>
  <div class="box">这是一个div</div>
  <span class="box">这是一个span</span>
  <script src="jquery-3.3.1.js"></script>
  <!--<script src="sizzle.js"></script>-->
  <!--<script src="jquerMey-1.0.1.js"></script>-->
  <script type="text/javascript">
    var $eles = $('.box');
    var $eles = jQuery('.box');
    console.log($eles)
    $eles.addClass('myFirst')
  </script>
</body>
</html>
``` 
![](https://user-gold-cdn.xitu.io/2018/12/24/167e02557ae6790d?w=558&h=118&f=png&s=13077)
可以看到，这边jQuery.fn.init 输出的是一个数组，还有一系列方法。我们一步步来。

这边先把JQ源码多余的东西都先删一下，可以看到，定义一个匿名函数，创建 **闭包**。
```
// 定义一个匿名函数，马上调用它,包起来调用的时候可以创建闭包
    (function(global,factory) {
        //内存中动态开辟了一块空间来执行这个里面的代码,对外是封闭的，可以访问外面的变量
    }(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
         /*这里的三元判断，除了BOM浏览器的运行环境还能运行在什么环境中？ =>node环境 (node运行在V8引擎中，主要用来做中间件) 
         中间件很多，架构与部署方面的中间件：webpack，grunt，gulp；功能方面的中间件：node.js（页面静态化） */
    }));
```    
好，接着分析


```
// 定义一个匿名函数，马上调用它,包起来调用的时候可以创建闭包
    (function (global, factory) {
        //内存中动态开辟了一块空间来执行这个里面的代码,对外是封闭的，可以访问外面的变量
        /*那么除了BOM浏览器的运行环境还能运行在什么环境中？ =>
     node环境 (node运行在V8引擎中，主要用来做中间件) 中间件很多，
     架构与部署方面的中间件：webpack，grunt，gulp；功能方面的中间件：node.js（页面静态化） */
        if (typeof module === "object" && typeof module.exports === "object") {
              // For CommonJS and CommonJS-like environments where a proper `window`
            module.exports = global.document ?
                factory(global, true) :
                function (w) {
                    if (!w.document) {
                        throw new Error("jQuery requires a window with a document");
                    }
                    return factory(w);
                };
        }
        else {
            factory(global);
        }
    }(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    }));
```
写到这里，那么这里注释说的CommonJS是什么呢？这就涉及到了上面说的node了。

CommonJS是nodejs也就是服务器端广泛使用的模块化机制。 该规范的主要内容是，模块必须通过module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

![](https://user-gold-cdn.xitu.io/2018/12/24/167e02a678b1792f?w=763&h=493&f=png&s=80800)
  

可以看到，这里并没有给factory()传入第二个参数，默认为false，则会执行下面if的代码(即为BOM环境)。在if语句中，可以看到jQuery一定是核心代码，那么jQuery到底是什么呢？继续看。


![](https://user-gold-cdn.xitu.io/2018/12/24/167e02aa290fc9e7?w=746&h=410&f=png&s=54772)

这里的jQuery本质就是一个函数，jQuery有一个fn对象，并且fn有一个init函数。这里的makeArrray本质是返回一个数组。


![](https://user-gold-cdn.xitu.io/2018/12/24/167e02ac9abb5719?w=525&h=611&f=png&s=57864)

往下看，可以看到这里jQuery的fn对象其实就是jQuery的原型对象;接着我们找到init方法。

 
```
jQuery.fn = jQuery.prototype = {
        init : function (selector, context) {
            return jQuery.makeArray( selector, context );
        }
    };
    jQuery.makeArray = function(selector, context){
        var $eles = new Sizzle(selector, context);
        return $eles;
    }
```
分析完jQuery.fn，我们看看makeArray。Sizzle.js文件里面有很多算法方面的代码，我们先跳过，继续分析代码。此时，我们用Chrome打开html代码，可以看到，输出如图：（此时还没有写addClass函数所以报错了）


![](https://user-gold-cdn.xitu.io/2018/12/24/167e02dd96637903?w=562&h=117&f=png&s=12216)


```
jQuery.fn = jQuery.prototype = {
        init : function (selector, context) {
            return jQuery.makeArray( selector, context );
        },
        each: function (func) {
            
        },
        addClass : function (className) {
            
        },
        removeClass: function (className) {

        }
    };
    jQuery.makeArray = function(selector, context){
        var $eles = new Sizzle(selector, context);
        $eles.prevObject = arguments.callee;
        $eles.__proto__ = jQuery.fn
        return $eles;
    }
```
继续补全，这样jQuery的 整体架构 就ok了，之后就是往里面添加东西。

(比如往里面添加addClass，removeClass，each方法)


```
jQuery.fn = jQuery.prototype = {
        init : function (selector, context) {
            return jQuery.makeArray( selector, context );
        },
        each: function (func) {
            for (var i=0;i<this.length;i++) {
                func.call(this,i,this[i]);
            }
            return this;
        },
        addClass : function (className) {
            return this.each(function (index, element) {
               element.className += " " + className
            })
        },
        removeClass: function (className) {
            return this.each(function (index, element) {
                element.className = ""
            })
        }
    };
 
```

我们可以看到此时控制台里面已经有了我们添加的方法，让我们来实验一下。


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jQuery源码解析</title>
</head>
<style>
    .myEleFirst {
        display: block;
        width: 100px;
        height: 100px;
        margin: 10px auto;
        background: red;
    }
    button {
        display: block;
        width: 20px;
        height: 20px;
        margin: auto;
   }
  </style>
  <body>
   <div class="myEle">这是一个div</div>
   <span class="myEle">这是一个span</span>
   <button onclick="removeClass()"></button>
   <!--<script src="jquery-3.3.1.js"></script>-->
  <script type="text/javascript" src="sizzle.min.js"></script>
  <script type="text/javascript" src="jquerMey-1.0.1.js"></script>
  <script type="text/javascript">
    var $eles = $(".myEle");
    var $eles = jQuery(".myEle");
    console.log($eles);
    $eles.addClass('myEleFirst');
    function removeClass() {
        $eles.removeClass("myEleFirst")
    }
  </script>
  </body>
</html>
```
结果如图：



![](https://user-gold-cdn.xitu.io/2018/12/25/167e2f749d2fea47?w=594&h=272&f=gif&s=4446)

附上全部代码：


```
/*!
 * jqueMey JavaScript Library v1.0.1
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * Email: huangmiantong@126.com || v_mtonhuang@tencent.com
 *
 * Date: 2018-12-11T22:04Z
 */

// 定义一个匿名函数，马上调用它,包起来调用的时候可以创建闭包
(function (global, factory) {
    //在BOM浏览器的运行环境
    /*那么除了BOM浏览器的运行环境还能运行在什么环境中？ =>
     node环境 (node运行在V8引擎中，主要用来做中间件) 中间件很多，
     架构与部署方面的中间件：webpack，grunt，gulp；功能方面的中间件：node.js（页面静态化） */
    //内存中动态开辟了一块空间来执行这个里面的代码
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var
        version = "1.0.1",

        // Define a local copy of jQuery
        jQuery = function( selector, context ) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        };
    jQuery.fn = jQuery.prototype = {
        init : function (selector, context) {
            return jQuery.makeArray( selector, context );
        },
        each: function (func) {
            for (var i=0;i<this.length;i++) {
                func.call(this,i,this[i]);
            }
            return this;
        },
        addClass : function (className) {
            return this.each(function (index, element) {
               element.className += " " + className
            })
        },
        removeClass: function (className) {
            return this.each(function (index, element) {
                element.className = ""
            })
        }
    };
    jQuery.makeArray = function(selector, context){
        var $eles = new Sizzle(selector, context);
        $eles.prevObject = arguments.callee;
        $eles.__proto__ = jQuery.fn
        return $eles;
    }
    // Expose jQuery and $ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (!noGlobal) {
        //BOM一定有window对象
        // jQuery一定是核心对象
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}));
 

```
未完待续...
