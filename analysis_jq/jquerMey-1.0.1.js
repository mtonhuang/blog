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
        //所以平时用的$其实是在此处定义的
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}));
