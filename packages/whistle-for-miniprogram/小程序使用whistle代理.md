## whistle-for-miniprogram（小程序使用代理）

### 一、背景
小程序原生http请求不能携带路由信息，既不支持RTX路由，也不支持路由，那么如何通过代理，修改请求头呢？

### 二、方案
通过 whistle 配置代理，修改请求头（通用）

### 三、whistle 的优缺点

|   工具   |   优点   |   缺点  |
|   ----  |   ----   |   ----  |
| whistle  |  通过whistle 配置代理与请求头，适用于 PC端与小程序端，直接在开发者工具上测试体验较为方便，测试无障碍  |  如果需要用手机代理测试，则必须安装证书（rootca），步骤比较繁琐，对产品同学以及不熟whistle的同学不太友好  |

### 四、使用whistle
#### 4.1 什么是whistle 
whistle是一个跨平台的抓包与 web debug 工具，使用 whistle，你可以配置代理服务器，修改请求头响应头
#### 4.2 whistle 的安装启动
1. 安装 node.js，[点击链接](https://nodejs.org/en/)，选择 LTS 版安装
2. 在命令行运行 tnpm install -g whistle（如果提示没有权限，要以 admin 或 sudo 的方式运行）
3. 启动关闭 whistle （通过命令行）
    ```
    // 启动whistle
    $ w2 start
    // 停止whistle
    $ w2 stop
    // 重启whistle
    $ w2 restart
    ```
#### 4.3 whistle 配置代理
1. 启动 whistle
2. 在浏览器访问http://127.0.0.1:8899/
3. 选择Rules，creat 一个自定义配置，比如beta，后面记得勾选上哦！
  
4. 打开微信开发者工具
   - “设置” => "代理" => “手动设置”：127.0.0.1:8899
   - “详情” => "本地配置"：“不校验合法域名、web-view（业务域名）、TLS 版本以及HTTPS证书” 
5. 重新编译，在浏览器的network界面可以看到请求，证明代理配置成功

#### 4.4 whistle 自定义请求头
1. 选择Values，creat 一个操作值

2. 点击某个请求，打开Inspectors，可以在Request headers中看到多了两个自定义的请求头